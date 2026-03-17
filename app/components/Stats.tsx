"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { YEARS_OF_EXPERIENCE } from "@/app/data/constants";

const stats = [
  { value: 80, suffix: "%", label: "Manual process reduction", icon: "📉", color: "#6366f1" },
  { value: 40, suffix: "%", label: "Support tickets eliminated", icon: "🎫", color: "#8b5cf6" },
  { value: 25, suffix: "%", label: "Page load speed improved", icon: "⚡", color: "#06b6d4" },
  { value: YEARS_OF_EXPERIENCE, suffix: "+", label: "Years of experience", icon: "🚀", color: "#10b981" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1800;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="stat-value">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px 80px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
        className="stats-grid"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card"
            style={{ padding: "28px 24px" }}
          >
            <div
              style={{
                fontSize: "1.8rem",
                marginBottom: "12px",
              }}
            >
              {s.icon}
            </div>
            <AnimatedCounter value={s.value} suffix={s.suffix} />
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.82rem",
                marginTop: "6px",
                lineHeight: "1.4",
              }}
            >
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
