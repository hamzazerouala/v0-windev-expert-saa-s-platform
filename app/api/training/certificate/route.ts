import { NextResponse } from "next/server"

// Mock API endpoint for generating certificates
// In production, this would generate a PDF certificate

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, trainingId } = body

    if (!userId || !trainingId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, verify training completion and generate PDF certificate
    console.log("[v0] Generating certificate for:", { userId, trainingId })

    // Mock certificate data
    const certificate = {
      certificateId: `CERT-${Date.now()}`,
      userId,
      trainingId,
      trainingTitle: "WinDev - Débutant à Expert",
      studentName: "Jean Dupont",
      completionDate: new Date().toISOString(),
      instructor: "Expert WindevExpert",
      certificateUrl: "/certificates/mock-certificate.pdf",
    }

    return NextResponse.json({
      success: true,
      message: "Certificate generated successfully",
      data: certificate,
    })
  } catch (error) {
    console.error("[v0] Error generating certificate:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
