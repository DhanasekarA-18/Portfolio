"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    role: "Software Engineer",
    company: "Vakilsearch (Zolvit)",
    period: "2023 – Present",
    location: "Chennai, India",
    type: "Full-time",
    color: "#6366f1",
    description:
      "Leading frontend engineering for key product verticals including document automation, GRC platform, and checkout optimization. Owning end-to-end feature delivery from design review to deployment.",
    achievements: [
      "Designed & shipped Self-Serve Document Flow, reducing manual ops effort by 80%",
      "Built GRC compliance dashboard handling 5000+ enterprise users with RBAC",
      "Refactored service bundle checkout, increasing average order value by 15%",
      "Established frontend coding standards and code review processes for the team",
    ],
    stack: ["Next.js", "TypeScript", "Redux Toolkit", "Node.js", "PostgreSQL"],
  },
  {
    role: "Associate Software Engineer",
    company: "Vakilsearch (Zolvit)",
    period: "2021 – 2023",
    location: "Chennai, India",
    type: "Full-time",
    color: "#8b5cf6",
    description:
      "Contributed to frontend development across multiple product teams. Focused on improving UI quality, implementing A/B experiments, and optimizing core web vitals.",
    achievements: [
      "Implemented A/B testing framework driving 30% increase in feature engagement",
      "Migrated search to Elasticsearch, improving response times by 40%",
      "Improved Lighthouse performance scores from 52 → 78 across main pages",
      "Reduced bundle size by 25% through code splitting and lazy loading strategies",
    ],
    stack: ["React", "JavaScript", "Redux", "Elasticsearch", "Redis"],
  },
];

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
        <p style={{ color: "var(--text-secondary)", marginTop: "12px", maxWidth: "460px", margin: "12px auto 0" }}>
          3+ years building products used by hundreds of thousands of users.
        </p>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: "60px" }}>
        {/* Timeline vertical line */}
        <div className="timeline-line" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role + exp.period}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
            style={{
              position: "relative",
              marginBottom: i < experiences.length - 1 ? "48px" : 0,
            }}
          >
            {/* Dot */}
            <div
              className="timeline-dot"
              style={{
                position: "absolute",
                left: "-51px",
                top: "22px",
                background: `linear-gradient(135deg, ${exp.color}, ${exp.color}cc)`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            </div>

            {/* Card */}
            <div className="glass-card" style={{ padding: "28px 32px" }}>
              {/* Title row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        color: exp.color,
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      {exp.company}
                    </span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>•</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{exp.location}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      background: `${exp.color}15`,
                      border: `1px solid ${exp.color}30`,
                      color: exp.color,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {exp.type}
                  </span>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      background: "rgba(99,102,241,0.08)",
                      border: "1px solid rgba(99,102,241,0.15)",
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  lineHeight: "1.7",
                  margin: "16px 0",
                }}
              >
                {exp.description}
              </p>

              {/* Achievements */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {exp.achievements.map((ach) => (
                  <li
                    key={ach}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: "1.6",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={exp.color}
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: "3px" }}
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {ach}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {exp.stack.map((s) => (
                  <span key={s} className="skill-badge" style={{ fontSize: "0.75rem" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
