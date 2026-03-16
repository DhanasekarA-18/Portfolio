"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const roles = [
  "Full-Stack Engineer",
  "React & Next.js Expert",
  "Performance Optimizer",
  "Product Builder",
];

function TypewriterText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    } else {
      const speed = deleting ? 40 : 70;
      timeout = setTimeout(() => {
        setDisplayed(
          deleting ? displayed.slice(0, -1) : current.slice(0, displayed.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);

  return (
    <span className="typing-cursor gradient-text" style={{ fontWeight: 800 }}>
      {displayed}
    </span>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    href: process.env.GITHUB_URL || "https://github.com/DhanasekarA-18",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: process.env.LINKEDIN_URL || "https://www.linkedin.com/in/dhanasekar-a-07a08a1a8/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:dhanasekarangamuthu@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="about"
      className="bg-grid"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "96px",
        paddingBottom: "64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-badge">
              <span>👋</span> Available for opportunities
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
            style={{ marginBottom: "12px" }}
          >
            Hi, I'm{" "}
            <span className="gradient-text">Dhanasekar A</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              marginBottom: "24px",
              color: "var(--text-secondary)",
              minHeight: "2rem",
            }}
          >
            <TypewriterText texts={roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: "1.8",
              maxWidth: "520px",
              marginBottom: "36px",
            }}
          >
            Frontend-leaning full-stack engineer with{" "}
            <strong style={{ color: "var(--text-primary)" }}>3+ years</strong> building
            scalable, high-performance web products. Experienced in onboarding
            optimization, analytics-driven improvements, and shipping fast.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}
          >
            <a href="#projects" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span>View My Work</span>
            </a>
            <a href="#contact" className="btn-outline">
              Let's Talk
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", gap: "12px", alignItems: "center" }}
          >
            {socialLinks.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(15,23,42,0.8)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "10px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                className="social-icon"
              >
                {s.icon}
              </motion.a>
            ))}
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginLeft: "4px" }}>
              Let's connect
            </span>
          </motion.div>
        </div>

        {/* Right: Avatar placeholder & decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div className="float-anim" style={{ position: "relative" }}>
            {/* Outer glow ring */}
            <div
              style={{
                width: "360px",
                height: "360px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)",
                padding: "3px",
                boxShadow: "0 0 60px rgba(99,102,241,0.3)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8rem",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/ds.jpeg"
                  alt="Dhanasekar A"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  loading={"eager"}
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0 }}
              style={{
                position: "absolute",
                top: "10px",
                right: "-30px",
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "12px",
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>⚡</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Performance</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>+25% Faster</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
              style={{
                position: "absolute",
                bottom: "30px",
                left: "-40px",
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(6,182,212,0.3)",
                borderRadius: "12px",
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>📉</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Automation</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>80% Reduction</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "10px",
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: "12px",
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🏢</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Experience</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Vakilsearch</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-muted)",
          fontSize: "0.75rem",
        }}
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            width: "24px",
            height: "38px",
            border: "2px solid rgba(99,102,241,0.3)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "8px",
              background: "var(--accent-primary)",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
