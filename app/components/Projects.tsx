"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  featuredProjects,
  professionalProjects,
  type FeaturedProject,
  type ProfessionalProject,
} from "@/app/data/projects";

// ─── Featured Project Card (Hero-style, large) ───────────────────
function FeaturedCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        background: "var(--bg-card)",
        border: "1px solid rgba(99,102,241,0.2)",
        boxShadow: "0 0 0 1px rgba(99,102,241,0.08), 0 16px 60px rgba(0,0,0,0.4)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
      className="featured-project-card"
    >
      {/* Gradient accent bar */}
      <div
        style={{
          height: "4px",
          background: project.gradient,
          width: "100%",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
        }}
        className="featured-inner-grid"
      >
        {/* Left — Content */}
        <div style={{ padding: "40px 40px 36px" }}>
          {/* Badges row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "999px",
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}35`,
                color: project.accentColor,
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
            >
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: project.accentColor,
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }} />
              Featured Project
            </div>

            {project.usedBy && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#10b981",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Used by {project.usedBy}
              </div>
            )}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "14px",
              lineHeight: "1.3",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ marginRight: "10px", fontSize: "1.6rem" }}>{project.icon}</span>
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.92rem",
              lineHeight: "1.75",
              marginBottom: "24px",
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "5px 14px",
                  borderRadius: "8px",
                  background: "rgba(15,23,42,0.8)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "var(--text-secondary)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "10px 22px", fontSize: "0.85rem" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              <span>Live Demo</span>
            </a>
            {project.githubUrls.map((gh) => (
              <a
                key={gh.label}
                href={gh.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ padding: "10px 22px", fontSize: "0.85rem" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                {gh.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Visual Preview */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            minHeight: "320px",
          }}
        >
          {/* Background decorative elements */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 30% 50%, ${project.accentColor}15 0%, transparent 60%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(99,102,241,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Browser mockup */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "85%",
              maxWidth: "340px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(99,102,241,0.25)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Browser top bar */}
            <div
              style={{
                background: "rgba(15,23,42,0.95)",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(99,102,241,0.08)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  fontFamily: "'Fira Code', monospace",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {project.previewUrl}
              </div>
            </div>
            {/* Stylized app preview */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a0a0a 0%, #0f172a 100%)",
                padding: "28px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
                minHeight: "180px",
              }}
            >
              <div style={{ fontSize: "2.8rem" }}>{project.icon}</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "4px" }}>
                  {project.previewTitle}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                  {project.previewSubtitle}
                </div>
              </div>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: "8px",
                  background: project.gradient,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Get Started
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Professional Work Card (Compact grid style) ─────────────────
function ProfessionalCard({
  project,
  index,
}: {
  project: ProfessionalProject;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card"
      style={{
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: `${project.color}18`,
            border: `1px solid ${project.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            flexShrink: 0,
          }}
        >
          {project.icon}
        </div>

        {/* Company badge */}
        <span
          style={{
            padding: "3px 10px",
            borderRadius: "999px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            color: "#a5b4fc",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          @ Vakilsearch
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: "1.02rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "10px",
            lineHeight: "1.35",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            lineHeight: "1.7",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Impact strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingTop: "12px",
          borderTop: "1px solid rgba(99,102,241,0.1)",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: project.color,
            boxShadow: `0 0 6px ${project.color}`,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "0.78rem",
            fontWeight: 500,
          }}
        >
          {project.impact}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        <div className="section-badge" style={{ margin: "0 auto 16px" }}>
          💼 Portfolio
        </div>
        <h2 className="section-title">
          Featured{" "}
          <span className="gradient-text">Projects</span>
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginTop: "12px",
            maxWidth: "560px",
            margin: "12px auto 0",
            fontSize: "0.95rem",
            lineHeight: "1.7",
          }}
        >
          Personal side-projects with live demos and open-source code,
          plus production systems I shipped at{" "}
          <span style={{ color: "#a5b4fc", fontWeight: 600 }}>
            Vakilsearch (Zolvit)
          </span>
          .
        </p>
      </motion.div>

      {inView && (
        <>
          {/* ── Featured Projects (Hero cards) ────────────── */}
          <div style={{ marginBottom: "56px" }}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "20px",
                  borderRadius: "4px",
                  background: "linear-gradient(180deg, #6366f1, #8b5cf6)",
                }}
              />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Open Source & Side Projects
              </h3>
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: "999px",
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: "#10b981",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                {featuredProjects.length} Live
              </span>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {featuredProjects.map((project, i) => (
                <FeaturedCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </div>

          {/* ── Professional Work ─────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "20px",
                  borderRadius: "4px",
                  background: "linear-gradient(180deg, #8b5cf6, #06b6d4)",
                }}
              />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Professional Work
              </h3>
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: "999px",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#a5b4fc",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                @ Vakilsearch
              </span>
            </motion.div>

            {/* NDA banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.18)",
                borderRadius: "12px",
                padding: "14px 20px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "1rem",
                }}
              >
                🏢
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 600, marginBottom: "2px" }}>
                  Professional Work — Vakilsearch / Zolvit
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  All projects below were built and shipped during my tenure as a Software Engineer. Due to NDA & proprietary nature, GitHub links may not be available.
                </p>
              </div>
            </motion.div>

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
              className="projects-grid"
            >
              {professionalProjects.map((project, i) => (
                <ProfessionalCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .featured-inner-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
        .featured-project-card:hover {
          border-color: rgba(99,102,241,0.4) !important;
          box-shadow: 0 0 0 1px rgba(99,102,241,0.15), 0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.08) !important;
          transform: translateY(-4px);
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
}
