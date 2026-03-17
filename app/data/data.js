const experiences = [
    {
        role: "Senior Software Engineer – Product & Platform",
        company: "Altimetrik (Client: Samsung)",
        period: "Jun 2025 – Present",
        location: "Chennai, India",
        type: "Full-time",
        color: "#22c55e",
        description:
            "Working on Samsung Shop operational platforms and CMS systems powering global storefront content. Building scalable UI infrastructure, internal tools, and performance-optimized frontend systems used across multiple Samsung operations teams.",
        achievements: [
            "Built and maintained SHOP CMS powering dynamic content for the Samsung Shop App",
            "Developed reusable widgets with live preview for faster content configuration",
            "Implemented a shared Header across OPS web tools using Storybook and a component library",
            "Created reusable UI components for the internal design system to standardize development",
            "Developed a centralized Audit Log service using Web Workers to capture actions without blocking the main thread",
            "Migrated the build system from Webpack to Vite, significantly improving build speed and HMR performance",
            "Reduced bundle size and improved load performance across OPS platforms",
            // "Implemented IAM-based User and Role management to enforce secure access control across OPS tools",
            // "Managed Git tag–based deployments to support controlled releases across multiple country environments",
            // "Performed secure testing during flagship launches and documented release processes in Confluence"
        ],
        stack: [
            "React",
            "Next.js",
            "TypeScript",
            "Storybook",
            "Vite",
            "Webpack",
            "Node.js",
            "Web Workers"
        ],
    },

    {
        role: "Software Engineer",
        company: "Vakilsearch (Zolvit)",
        period: "Jul 2024 – May 2025",
        location: "Chennai, India",
        type: "Full-time",
        color: "#6366f1",
        description:
            "Led frontend development for multiple product verticals including onboarding flows, document automation, and analytics-driven product optimization.",
        achievements: [
            "Designed and implemented Self-Serve Document Flow reducing manual document collection by 80%",
            "Integrated Mixpanel and MoEngage analytics improving feature adoption by 30%",
            "Optimized Elasticsearch-based search improving data retrieval speed by 40%",
            "Improved application performance using lazy loading, code splitting and adaptive UI optimizations",
            "Collaborated with backend teams to integrate scalable REST APIs and improve response times"
        ],
        stack: [
            "Next.js",
            "React",
            "JavaScript",
            "Elasticsearch",
            "Mixpanel",
            "MoEngage"
        ],
    },

    {
        role: "Associate Software Engineer",
        company: "Vakilsearch",
        period: "Jul 2023 – Jun 2024",
        location: "Chennai, India",
        type: "Full-time",
        color: "#8b5cf6",
        description:
            "Worked on core product features including GRC systems, onboarding flows, and payment integrations for business services platforms.",
        achievements: [
            "Built Governance, Risk and Compliance (GRC) platform reducing support requests by 40%",
            "Implemented A/B testing experiments using Growthbook improving user engagement by 70%",
            "Designed optimized onboarding flows increasing user retention by 20%",
            "Developed service bundle purchase flow increasing average order value by 15%",
            "Integrated secure payment flows using PayU and Razorpay improving transaction success rates"
        ],
        stack: [
            "React",
            "Next.js",
            "JavaScript",
            "Growthbook",
            "Razorpay",
            "PayU"
        ],
    },

    {
        role: "Software Engineer Intern",
        company: "Vakilsearch",
        period: "Jul 2022 – Jun 2023",
        location: "Chennai, India",
        type: "Internship",
        color: "#f59e0b",
        description:
            "Contributed to frontend development of production applications while learning modern React and Next.js development practices.",
        achievements: [
            "Built responsive UI components using React, HTML, CSS and JavaScript",
            "Implemented mobile-first UI improving mobile engagement by 25%",
            "Used SSG and SSR in Next.js improving page load speed by 50%",
            "Improved CSS maintainability using Sass and modular styling",
            "Achieved 95 Lighthouse performance score through frontend optimization"
        ],
        stack: [
            "React",
            "Next.js",
            "JavaScript",
            "HTML",
            "CSS",
            "Sass"
        ],
    }
];

export { experiences }