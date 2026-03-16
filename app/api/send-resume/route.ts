import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();

        // ── Validate input ──────────────────────────────────────────
        if (!email || !email.trim()) {
            return NextResponse.json(
                { success: false, error: "Email is required." },
                { status: 400 }
            );
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return NextResponse.json(
                { success: false, error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        // ── Read resume using fs (works in production / serverless) ──
        // process.cwd() always resolves to the project root in Next.js
        const resumeFilename = process.env.RESUME_FILENAME ?? "Dhanasekar_A_resume.pdf";
        const resumePath = path.join(process.cwd(), "public", resumeFilename);

        if (!fs.existsSync(resumePath)) {
            console.error("Resume file not found at:", resumePath);
            return NextResponse.json(
                { success: false, error: "Resume file not found on server." },
                { status: 500 }
            );
        }

        // Read into Buffer so the absolute path is resolved at build time
        // and works correctly in all environments (dev, prod, Docker, Vercel).
        const resumeBuffer = fs.readFileSync(resumePath);

        // ── Configure transport from .env ───────────────────────────
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const recipientName = name?.trim() || "there";

        const mailOptions = {
            from: `"Dhanasekar A" <${process.env.MAIL_FROM}>`,
            to: email.trim(),
            subject: "Here's Dhanasekar's Resume 📄",
            html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0f1e;color:#f1f5f9;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px;">
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;">Hi ${recipientName}! 👋</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Thanks for your interest in my work.</p>
          </div>
          <div style="padding:32px 40px;">
            <p style="color:#94a3b8;line-height:1.7;font-size:15px;">
              I've attached my latest <strong style="color:#a5b4fc">resume</strong> to this email.
              Feel free to reach out if you'd like to discuss any opportunities or just have a chat about tech!
            </p>
            <div style="margin:28px 0;padding:20px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:10px;">
              <p style="margin:0 0 4px;font-weight:700;color:#fff;font-size:14px;">📎 Attachment</p>
              <p style="margin:0;color:#94a3b8;font-size:13px;">${resumeFilename}</p>
            </div>
            <p style="color:#94a3b8;font-size:13px;margin-top:24px;">
              You can also connect with me on 
              <a href="${process.env.LINKEDIN_URL}" style="color:#a5b4fc;text-decoration:none;font-weight:600;">LinkedIn</a> or
              <a href="${process.env.GITHUB_URL}" style="color:#a5b4fc;text-decoration:none;font-weight:600;">GitHub</a>.
            </p>
          </div>
          <div style="padding:20px 40px;border-top:1px solid rgba(99,102,241,0.15);text-align:center;">
            <p style="margin:0;color:#475569;font-size:12px;">This is an automated email from Dhanasekar's portfolio. Please do not reply.</p>
          </div>
        </div>
      `,
            attachments: [
                {
                    filename: resumeFilename,
                    content: resumeBuffer,        // Buffer — no absolute path exposed in prod
                    contentType: "application/pdf",
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Resume sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("send-resume error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send email. Please try again." },
            { status: 500 }
        );
    }
}
