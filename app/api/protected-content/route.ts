import { type NextRequest, NextResponse } from "next/server"
import { verifySignedUrl, trackDownload } from "@/lib/content-security"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const resourcePath = searchParams.get("path")
  const userId = searchParams.get("user")
  const expiresAt = searchParams.get("expires")
  const signature = searchParams.get("signature")

  // Validate parameters
  if (!resourcePath || !userId || !expiresAt || !signature) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  // Verify the signed URL
  if (!verifySignedUrl(resourcePath, userId, expiresAt, signature)) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 })
  }

  // Track the download
  const canDownload = await trackDownload(userId, resourcePath)
  if (!canDownload) {
    return NextResponse.json({ error: "Download limit exceeded" }, { status: 429 })
  }

  try {
    // Read the file from the protected directory
    const filePath = join(process.cwd(), "protected", resourcePath)
    const fileBuffer = await readFile(filePath)

    // Determine content type based on file extension
    const ext = resourcePath.split(".").pop()?.toLowerCase()
    const contentTypes: Record<string, string> = {
      pdf: "application/pdf",
      zip: "application/zip",
      mp4: "video/mp4",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
    }

    const contentType = contentTypes[ext || ""] || "application/octet-stream"

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${resourcePath.split("/").pop()}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
    })
  } catch (error) {
    console.error("[v0] Error serving protected content:", error)
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}
