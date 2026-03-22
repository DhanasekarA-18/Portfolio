"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────
type ToastType = "success" | "error";
interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

// ── Toast Component ──────────────────────────────────────────────
function ToastNotification({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), 4500);
    return () => clearTimeout(t);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 18px",
        borderRadius: "12px",
        background: toast.type === "success"
          ? "rgba(16, 185, 129, 0.12)"
          : "rgba(239, 68, 68, 0.12)",
        border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        minWidth: "300px",
        maxWidth: "420px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: toast.type === "success"
            ? "rgba(16,185,129,0.2)"
            : "rgba(239,68,68,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {toast.type === "success" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
          </svg>
        )}
      </div>
      <p style={{
        color: "var(--text-primary)",
        fontSize: "0.875rem",
        flex: 1,
        lineHeight: "1.4",
      }}>
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          padding: "4px",
          display: "flex",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

// ── Resume Modal ─────────────────────────────────────────────────
function ResumeModal({
  onClose,
  onSuccess,
  onError,
}: {
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);


  const validateEmail = (val: string) => {
    if (!val.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return "Please enter a valid email address.";
    return "";
  };

  const validateName = (val: string) => {
    if (!val.trim()) return "Your name is required.";
    if (val.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const error = validateName(name);
      setNameError(error);
      if (!error) {
        emailRef.current?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ne = validateName(name);
    const ee = validateEmail(email);
    setNameError(ne);
    setEmailError(ee);
    if (ne || ee) return;

    setLoading(true);
    try {
      const res = await fetch("/api/send-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(`Resume sent to ${email.trim()} — check your inbox! 📬`);
        onClose();
      } else {
        onError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      onError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3,7,18,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(10,15,30,0.98)",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "20px",
          padding: "0",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)",
          overflow: "hidden",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.04))",
            borderBottom: "1px solid rgba(99,102,241,0.1)",
            padding: "32px 32px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(99,102,241,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                border: "1px solid rgba(99,102,241,0.2)"
              }}
            >
              📄
            </div>
            <div>
              <h2
                id="modal-title"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: "0 0 4px",
                  lineHeight: "1.2",
                  letterSpacing: "-0.01em"
                }}
              >
                Get Resume
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0, opacity: 0.8 }}>
                Directly to your inbox
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              flexShrink: 0,
              transition: "all 0.3s ease",
            }}
            className="modal-close-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} noValidate style={{ padding: "28px 32px 32px" }}>
          {/* Name field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="resume-name"
              style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.02em" }}
            >
              Your Name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <input
                id="resume-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (nameError) setNameError(""); }}
                onBlur={() => setNameError(validateName(name))}
                onKeyDown={handleNameKeyDown}
                placeholder="e.g. Jane Smith"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  background: "rgba(15,23,42,0.6)",
                  border: `1px solid ${nameError
                    ? "rgba(239,68,68,0.5)"
                    : (name && !nameError)
                      ? "rgba(16,185,129,0.4)"
                      : "rgba(99,102,241,0.2)"
                    }`,
                  borderRadius: "12px",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxSizing: "border-box",
                  opacity: loading ? 0.6 : 1,
                  boxShadow: name && !nameError ? "0 0 15px rgba(16,185,129,0.05)" : "none",
                }}
                className="modal-input"
                autoFocus={true}
              />
              <AnimatePresence>
                {name && !nameError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#10b981" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {nameError && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "8px", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                  </svg>
                  {nameError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email field */}
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="resume-email"
              style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.02em" }}
            >
              Email Address <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                </svg>
              </div>
              <input
                id="resume-email"
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
                onBlur={() => setEmailError(validateEmail(email))}
                placeholder="you@example.com"
                disabled={loading}
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  background: "rgba(15,23,42,0.6)",
                  border: `1px solid ${emailError
                    ? "rgba(239,68,68,0.5)"
                    : (email && !emailError)
                      ? "rgba(16,185,129,0.4)"
                      : "rgba(99,102,241,0.2)"
                    }`,
                  borderRadius: "12px",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxSizing: "border-box",
                  opacity: loading ? 0.6 : 1,
                  boxShadow: email && !emailError ? "0 0 15px rgba(16,185,129,0.05)" : "none",
                }}
                className="modal-input"
              />
              <AnimatePresence>
                {email && !emailError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#10b981" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "8px", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                  </svg>
                  {emailError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Privacy note */}
          <div
            style={{
              background: "rgba(99,102,241,0.05)",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "28px",
              border: "1px solid rgba(99,102,241,0.1)"
            }}
          >
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, display: "flex", gap: "8px", alignItems: "flex-start", lineHeight: "1.5" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Your email is only used to send the resume and is <b>never stored or shared</b> with third parties.</span>
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cancel-btn"
              style={{
                flex: "0 0 auto",
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "12px",
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                opacity: loading ? 0.5 : 1,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
              style={{
                flex: 1,
                padding: "12px 24px",
                background: loading
                  ? "rgba(99,102,241,0.4)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px rgba(99,102,241,0.25)",
              }}
            >
              {loading ? (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    style={{ animation: "spin 0.8s linear infinite" }}
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                  <span>Send My Resume</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .modal-input:focus { 
          border-color: rgba(99,102,241,0.8) !important; 
          box-shadow: 0 0 0 4px rgba(99,102,241,0.15) !important;
          background: rgba(15,23,42,0.8) !important;
        }
        .modal-close-btn:hover { background: rgba(255,255,255,0.08) !important; color: var(--text-primary) !important; transform: rotate(90deg); }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99,102,241,0.3); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .cancel-btn:hover:not(:disabled) { background: rgba(255,255,255,0.03) !important; border-color: rgba(99,102,241,0.4) !important; color: var(--text-primary) !important; }
      `}</style>
    </motion.div>
  );
}

// ── Contact Links ────────────────────────────────────────────────
const contactLinks = [
  {
    label: "Email",
    value: "dhanasekarangamuthu@gmail.com",
    href: "mailto:dhanasekarangamuthu@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
      </svg>
    ),
    color: "#6366f1",
    description: "Best way to reach me",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dhanasekar-a",
    href: process.env.LINKEDIN_URL || "https://www.linkedin.com/in/dhanasekar-a-07a08a1a8/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0077b5",
    description: "Let's connect professionally",
  },
  {
    label: "GitHub",
    value: "github.com/DhanasekarA-18",
    href: process.env.GITHUB_URL || "https://github.com/DhanasekarA-18",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "#94a3b8",
    description: "View my open source work",
  },
];

// ── Main Contact Section ─────────────────────────────────────────
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("dhanasekarangamuthu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <>
      {/* ── Toast Container ── */}
      <div
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 3000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastNotification key={t.id} toast={t} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Resume Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <ResumeModal
            onClose={() => setModalOpen(false)}
            onSuccess={(msg) => addToast("success", msg)}
            onError={(msg) => addToast("error", msg)}
          />
        )}
      </AnimatePresence>

      {/* ── Contact Section ── */}
      <section
        id="contact"
        ref={ref}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px 120px",
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
            📬 Get in Touch
          </div>
          <h2 className="section-title">
            Let's Build{" "}
            <span className="gradient-text">Something Great</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "12px",
              maxWidth: "520px",
              margin: "12px auto 0",
              fontSize: "1.05rem",
              lineHeight: "1.7",
            }}
          >
            Open to exploring new opportunities, challenging engineering problems,
            and high-impact product roles. Let's connect.
          </p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            maxWidth: "700px",
            margin: "0 auto 48px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "20px",
            padding: "48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div
            style={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🤝</div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", color: "var(--text-primary)" }}>
            Ready to Collaborate?
          </h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "0.9rem", lineHeight: "1.7" }}>
            Whether it's a full-time opportunity, freelance project, or just a
            chat about tech — I'm always open to meaningful conversations.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {/* ── Primary: Download via API (fs-served, correct filename) ── */}
            <a
              href="/Dhanasekar_A_resume.pdf"
              download="Dhanasekar_A_resume.pdf"
              className="btn-primary"
              style={{ padding: "8px 20px", fontSize: "0.82rem" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              <span>Download Resume</span>
            </a>

            {/* ── Secondary: Send via Email modal ── */}
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline"
              style={{ cursor: "pointer" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
              </svg>
              Send to Email
            </motion.button>

            {/* ── Tertiary: Copy email ── */}
            <motion.button
              onClick={copyEmail}
              className="btn-outline"
              whileTap={{ scale: 0.97 }}
              style={{ cursor: "pointer" }}
            >
              {copied ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span style={{ color: "#10b981" }}>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy Email
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Contact Links Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            maxWidth: "700px",
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card"
              style={{
                padding: "24px 20px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${link.color}15`,
                  border: `1px solid ${link.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: link.color,
                }}
              >
                {link.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem", marginBottom: "2px" }}>
                  {link.label}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>
                  {link.description}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            marginTop: "60px",
          }}
        >
          Designed & built by{" "}
          <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Dhanasekar A</span>
          {" "}• 2025 • Built with Next.js & Framer Motion
        </motion.p>

        <style>{`
          @media (max-width: 600px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
          .resume-email-btn:hover {
            background: rgba(16,185,129,0.18) !important;
            border-color: rgba(16,185,129,0.55) !important;
            box-shadow: 0 0 20px rgba(16,185,129,0.15);
          }
        `}</style>
      </section>
    </>
  );
}
