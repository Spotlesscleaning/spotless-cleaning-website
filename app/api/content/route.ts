import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

// Get all content
export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: content, error } = await supabase
      .from("website_content")
      .select("*")
      .order("section", { ascending: true })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// Update content
export async function PUT(request: NextRequest) {
  try {
    // Verify admin session
    const sessionToken = request.cookies.get("admin-session")?.value
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { section, key, value } = await request.json()

    const supabase = createServerClient()

    const { error } = await supabase
      .from("website_content")
      .upsert({ section, key, value, updated_at: new Date().toISOString() })

    if (error) {
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
