import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhanasekar A | Full-Stack Engineer",
  description:
    "Senior Software Engineer specializing in React, Next.js & Node.js — building scalable, high-performance web products.",
  keywords: [
    "Dhanasekar",
    "Software Engineer",
    "React",
    "Next.js",
    "Full Stack",
    "Frontend",
  ],
  authors: [{ name: "Dhanasekar A" }],
  openGraph: {
    title: "Dhanasekar A | Full-Stack Engineer",
    description:
      "Senior Software Engineer specializing in React, Next.js & Node.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
