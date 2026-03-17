"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    name: "Frontend",
    icon: "🎨",
    color: "#6366f1",
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES2022+)", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "State & Data",
    icon: "🗃️",
    color: "#8b5cf6",
    skills: ["Redux Toolkit", "Zustand", "React Query", "Context API", "SWR"],
  },
  {
    name: "Backend",
    icon: "⚙️",
    color: "#06b6d4",
    skills: ["Node.js", "Express.js", "REST APIs", "WebSockets", "JWT Auth"],
  },
  {
    name: "Database & Infra",
    icon: "🗄️",
    color: "#10b981",
    skills: ["MongoDB", "Redis", "Elasticsearch", "Docker Basics"],
  },
  {
    name: "Dev Tooling",
    icon: "🛠️",
    color: "#f59e0b",
    skills: ["Git", "GitHub Actions", "Webpack", "Vite", "ESLint", "Jest", "Playwright"],
  },
  {
    name: "Practices",
    icon: "🔬",
    color: "#ef4444",
    skills: ["A/B Testing", "Web Vitals", "Agile/Scrum", "Code Review", "Performance Profiling"],
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
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
          🛠 Tech Stack
        </div>
        <h2 className="section-title">
          Skills &{" "}
          <span className="gradient-text">Technologies</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px", maxWidth: "480px", margin: "12px auto 0" }}>
          Tools and technologies I use to build fast, scalable applications.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
        className="skills-grid"
      >
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={item}
            style={{
              background: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
              transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
              position: "relative",
              overflow: "hidden"
            }}
            className="skill-category-card"
          >
            {/* Category background glow */}
            <div style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "80px",
              height: "80px",
              background: cat.color,
              filter: "blur(40px)",
              opacity: 0.1,
              zIndex: 0
            }} />

            {/* Category header */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  boxShadow: `0 8px 16px -4px ${cat.color}30`
                }}
              >
                {cat.icon}
              </div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "#fff",
                  letterSpacing: "-0.01em"
                }}
              >
                {cat.name}
              </h3>
            </div>

            {/* Skills */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {cat.skills.map((skill) => (
                <span 
                  key={skill} 
                  style={{
                    padding: "6px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "var(--text-secondary)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    cursor: "default"
                  }}
                  className="skill-item-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
