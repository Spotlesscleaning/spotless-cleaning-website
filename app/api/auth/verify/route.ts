import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin-session")?.value

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Decode session token (simplified)
    const [userId] = Buffer.from(sessionToken, "base64").toString().split(":")

    const supabase = createServerClient()

    const { data: user, error } = await supabase.from("admin_users").select("id, email").eq("id", userId).single()

    if (error || !user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
