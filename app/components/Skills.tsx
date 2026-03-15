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
    skills: ["MongoDB", "PostgreSQL", "Redis", "Elasticsearch", "Docker Basics"],
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
        animate={inView ? "show" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
        className="skills-grid"
      >
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={item}
            className="glass-card"
            style={{ padding: "28px" }}
          >
            {/* Category header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: `${cat.color}20`,
                  border: `1px solid ${cat.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                {cat.icon}
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                }}
              >
                {cat.name}
              </h3>
            </div>

            {/* Skills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {cat.skills.map((skill) => (
                <span key={skill} className="skill-badge">
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
