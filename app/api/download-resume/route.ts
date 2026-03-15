import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        // Read from app/ folder using fs — works in dev and production
        const filePath = path.join(process.cwd(), "app", "Dhansekar_A_resume.pdf");

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "Resume file not found." },
                { status: 404 }
            );
        }

        const fileBuffer = fs.readFileSync(filePath);

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                // Forces browser to download with this exact filename
                "Content-Disposition": 'attachment; filename="Dhansekar_A_resume.pdf"',
                "Content-Length": fileBuffer.length.toString(),
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("download-resume error:", error);
        return NextResponse.json(
            { error: "Failed to serve resume." },
            { status: 500 }
        );
    }
}
