// ─── Types ────────────────────────────────────────────────────────
export interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrls: { label: string; url: string }[];
  icon: string;
  gradient: string;
  accentColor: string;
  previewTitle: string;
  previewSubtitle: string;
  previewUrl: string;
  usedBy?: string;
}

export interface ProfessionalProject {
  title: string;
  description: string;
  tags: string[];
  impact: string;
  icon: string;
  color: string;
}

// ─── Featured / Personal Projects ─────────────────────────────────
export const featuredProjects: FeaturedProject[] = [
  {
    title: "DS SECURE SCAN | Vulnerability Intelligence",
    description:
      "A high-performance vulnerability scanner that audits npm dependencies in real-time. Features automated GitHub repository scraping, manual package.json analysis, and deep CVE intelligence to secure Node.js applications.",
    tags: ["Next.js", "TypeScript", "Web Scraping", "Security API", "Tailwind CSS"],
    liveUrl: "https://vulnerability-checker-smoky.vercel.app/",
    githubUrls: [
      { label: "Source Code", url: "https://github.com/DhanasekarA-18/Vulnerability-checker" },
    ],
    icon: "🛡️",
    gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    accentColor: "#4f46e5",
    previewTitle: "DS SECURE SCAN",
    previewSubtitle: "Fetch • Audit • Secure",
    previewUrl: "vulnerability-checker-smoky.vercel.app",
  },
  {
    title: "Email Template Generator",
    description:
      "A drag-and-drop email template builder with live HTML preview, syntax-highlighted code editor (Monaco), and direct integration with the marketing notification pipeline — built and shipped for internal team use.",
    tags: ["Next.js", "React", "Monaco Editor", "CSS"],
    liveUrl: "https://email-template-for-zolvit.vercel.app/buildEmailTemplate",
    githubUrls: [
      { label: "Source Code", url: "https://github.com/DhanasekarA-18/Email-Template-for-Zolvit" },
    ],
    icon: "✉️",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    accentColor: "#8b5cf6",
    previewTitle: "Email Builder",
    previewSubtitle: "Drag • Design • Deploy",
    previewUrl: "email-template-for-zolvit.vercel.app",
    usedBy: "VS Notification Manager Team",
  },
  {
    title: "DS FOOD | Gourmet Delivery",
    description:
      "A premium food delivery application featuring a real-time cart, secure Razorpay checkout, and automated email order confirmations via Nodemailer. Built with a sleek dark-themed UI for a gourmet dining experience.",
    tags: ["Next.js", "React", "Node.js", "Razorpay", "Nodemailer", "SCSS"],
    liveUrl: "https://food-8tp1f5mnw-dhanasekar-as-projects.vercel.app/",
    githubUrls: [
      { label: "Source Code", url: "https://github.com/DhanasekarA-18/foodAPP" },
    ],
    icon: "🥘",
    gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
    accentColor: "#10b981",
    previewTitle: "DS FOOD",
    previewSubtitle: "Order • Pay • Enjoy",
    previewUrl: "food-8tp1f5mnw-dhanasekar-as-projects.vercel.app",
  },
  {
    title: "Real-Time Collaborative Drawing Board",
    description:
      "A full-stack real-time collaborative drawing app where multiple users can draw together on a shared canvas. Features include adjustable brush size & color, per-user canvas reset, and persistent strokes that reload on refresh — all powered by WebSockets.",
    tags: ["Next.js", "React", "Socket.io", "Express.js", "Node.js", "Tailwind CSS"],
    liveUrl: "https://drawing-app-fe-five.vercel.app/",
    githubUrls: [
      { label: "Frontend", url: "https://github.com/DhanasekarA-18/Drawing-App-FE" },
      { label: "Backend", url: "https://github.com/DhanasekarA-18/Drawing-App--BE" },
    ],
    icon: "🎨",
    gradient: "linear-gradient(135deg, #6366f1, #06b6d4)",
    accentColor: "#06b6d4",
    previewTitle: "Drawing Board",
    previewSubtitle: "Draw • Collaborate • Share",
    previewUrl: "drawing-app-fe-five.vercel.app",
  },
  {
    title: "Secret Santa Generator",
    description:
      "A fun web app to automate Secret Santa assignments. Upload employee data via Excel, apply smart rules to avoid self-assignment and previous-year repeats, and download results instantly.",
    tags: ["Next.js 15", "React", "XLSX", "Jest", "CSS"],
    liveUrl: "https://secret-santa-assigning.vercel.app/",
    githubUrls: [
      { label: "Source Code", url: "https://github.com/DhanasekarA-18/Secret-Santa-Assigning" },
    ],
    icon: "🎅",
    gradient: "linear-gradient(135deg, #ef4444, #f97316)",
    accentColor: "#ef4444",
    previewTitle: "Secret Santa",
    previewSubtitle: "Upload • Assign • Download",
    previewUrl: "secret-santa-assigning.vercel.app",
  },
];

// ─── Professional Projects (Vakilsearch) ──────────────────────────
export const professionalProjects: ProfessionalProject[] = [
  {
    title: "Self-Serve Document Flow",
    description:
      "Automated end-to-end document collection system using Next.js and WebSocket-based real-time uploads. Reduced manual processing effort by 80% and shortened customer turnaround time from days to hours.",
    tags: ["Next.js", "WebSockets", "Node.js", "MongoDB"],
    impact: "80% reduction in manual effort",
    icon: "📄",
    color: "#6366f1",
  },
  {
    title: "GRC Compliance Platform",
    description:
      "Enterprise governance, risk & compliance dashboard with dynamic table management, audit trails, and role-based access control. Reduced support tickets by 40% through improved self-service capabilities.",
    tags: ["React", "Redux", "Express", "PostgreSQL"],
    impact: "40% drop in support tickets",
    icon: "🏛️",
    color: "#8b5cf6",
  },
  {
    title: "Service Bundle Purchase Flow",
    description:
      "Multi-service checkout redesign with intelligent upsell recommendations and a streamlined payment UX. Drove a 15% increase in average order value through better product bundling logic.",
    tags: ["React", "TypeScript", "Redux Toolkit", "REST API"],
    impact: "15% increase in AOV",
    icon: "🛒",
    color: "#06b6d4",
  },
  {
    title: "Elasticsearch Search Upgrade",
    description:
      "Migrated the core product search experience to Elasticsearch with smart autocomplete, faceted filtering, and relevance tuning. Improved search response times by 40% and boosted feature adoption.",
    tags: ["Elasticsearch", "Node.js", "Redis", "React"],
    impact: "40% faster search performance",
    icon: "🔍",
    color: "#10b981",
  },
  {
    title: "A/B Testing & Experimentation",
    description:
      "Built an internal A/B testing framework for running controlled experiments across key funnel pages with real-time metrics dashboards and statistical significance tracking.",
    tags: ["React", "Analytics", "Node.js", "PostgreSQL"],
    impact: "30% increase in feature adoption",
    icon: "🧪",
    color: "#f59e0b",
  },
];
