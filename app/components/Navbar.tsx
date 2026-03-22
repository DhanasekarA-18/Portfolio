"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };

    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }, 200);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", handleHashScroll);
    handleHashScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setMobileOpen(false);
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "20px 0",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className={scrolled ? "navbar-glass" : ""}
    >
      <div
        style={{
          maxWidth: scrolled ? "1100px" : "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: scrolled ? "56px" : "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          background: scrolled ? "rgba(10, 15, 30, 0.4)" : "transparent",
          borderRadius: scrolled ? "24px" : "0px",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div style={{
              width: scrolled ? "36px" : "40px",
              height: scrolled ? "36px" : "40px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "1.1rem",
              color: "#fff",
              boxShadow: "0 8px 16px -4px rgba(99,102,241,0.5)",
              transition: "all 0.4s ease"
            }}>D</div>
            <span style={{
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em"
            }}>
              Dhanasekar<span style={{ color: "var(--accent-primary)" }}>.</span>
            </span>
          </motion.div>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "8px", alignItems: "center" }} className="hidden-mobile">
          <LayoutGroup>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  position: "relative",
                  padding: "8px 16px",
                  color: active === link.href.slice(1) ? "#fff" : "var(--text-secondary)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                {active === link.href.slice(1) && (
                  <motion.div
                    layoutId="active-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(99, 102, 241, 0.12)",
                      borderRadius: "12px",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                    }}
                  />
                )}
              </a>
            ))}
          </LayoutGroup>

          <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.1)", margin: "0 12px" }} />

          <motion.a
            href="/Dhanasekar_A_resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            style={{
              padding: scrolled ? "8px 18px" : "10px 22px",
              fontSize: "0.82rem",
              borderRadius: "12px",
              boxShadow: "0 8px 20px -6px rgba(99,102,241,0.4)"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span>Resume</span>
          </motion.a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "10px",
            borderRadius: "12px",
            color: "#fff",
            cursor: "pointer",
            display: "none"
          }}
          className="show-mobile"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            style={{
              position: "absolute",
              top: scrolled ? "76px" : "84px",
              left: "24px",
              right: "24px",
              background: "rgba(10, 15, 30, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  color: active === link.href.slice(1) ? "#fff" : "var(--text-secondary)",
                  background: active === link.href.slice(1) ? "rgba(99, 102, 241, 0.1)" : "transparent",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: active === link.href.slice(1) ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent"
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/Dhanasekar_A_resume.pdf"
              download
              className="btn-primary"
              style={{ marginTop: "16px", justifyContent: "center", borderRadius: "16px" }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
