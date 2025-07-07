"use client"

import { useState, useEffect } from "react"

interface ContentItem {
  section: string
  key: string
  value: string
}

export function useWebsiteContent() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch("/api/content")
      const data = await response.json()
      setContent(data.content || [])
    } catch (error) {
      console.error("Failed to load content:", error)
    } finally {
      setLoading(false)
    }
  }

  const getContent = (section: string, key: string, fallback = "") => {
    const item = content.find((c) => c.section === section && c.key === key)
    return item?.value || fallback
  }

  return { content, loading, getContent }
}
