"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { YEARS_OF_EXPERIENCE } from "@/app/data/constants";

import { experiences } from '@/app/data/data.js'

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <div className="section-badge" style={{ margin: "0 auto 16px" }}>
          📅 Career
        </div>
        <h2 className="section-title">
          Work{" "}
          <span className="gradient-text">Experience</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px", margin: "12px auto 0" }}>
          {YEARS_OF_EXPERIENCE}+ years building products used by hundreds of thousands of users.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="experience-timeline" style={{ position: "relative" }}>
        {/* Timeline vertical line */}
        <motion.div
          className="timeline-line"
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: "100%", opacity: 0.15 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ width: "1px", left: "20px" }}
        />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role + exp.period}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              position: "relative",
              marginBottom: i < experiences.length - 1 ? "64px" : 0,
              paddingLeft: "60px"
            }}
          >
            {/* Dot & Glow */}
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "24px",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px"
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.2 }}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: exp.color,
                  boxShadow: `0 0 20px 4px ${exp.color}40`,
                  border: "2px solid #fff",
                  position: "relative",
                  zIndex: 2
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: exp.color,
                  filter: "blur(12px)",
                  zIndex: 1
                }}
              />
            </div>

            {/* Content Card */}
            <div style={{
              background: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
              transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border 0.4s ease",
            }}
            className="experience-card-hover"
            >
              {/* Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "20px"
              }}>
                <div>
                  <h3 style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: "6px",
                    letterSpacing: "-0.01em"
                  }}>
                    {exp.role}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ color: exp.color, fontWeight: 700, fontSize: "1rem" }}>{exp.company}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>•</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500 }}>{exp.location}</span>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <div style={{
                    padding: "6px 14px",
                    borderRadius: "12px",
                    background: `${exp.color}10`,
                    border: `1px solid ${exp.color}20`,
                    color: exp.color,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase"
                  }}>
                    {exp.type}
                  </div>
                  <div style={{
                    padding: "6px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "var(--text-secondary)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    fontFamily: "'Fira Code', monospace"
                  }}>
                    {exp.period}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                lineHeight: "1.7",
                marginBottom: "24px"
              }}>
                {exp.description}
              </p>

              {/* Achievements */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                {exp.achievements.map((ach, j) => (
                  <motion.div
                    key={ach}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.1 + 0.3 }}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: "1.6"
                    }}
                  >
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: exp.color,
                      marginTop: "10px",
                      flexShrink: 0
                    }} />
                    {ach}
                  </motion.div>
                ))}
              </div>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {exp.stack.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "var(--text-primary)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                    }}
                    className="tech-tag-scroll"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .experience-card-hover:hover {
          border-color: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-4px);
        }
        .tech-tag-scroll:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
        @media (max-width: 640px) {
          .experience-timeline { padding-left: 0 !important; }
          .timeline-line { display: none; }
          .experience-card-hover { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
}
