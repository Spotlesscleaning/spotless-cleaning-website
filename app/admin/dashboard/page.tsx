"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Settings, FileText, Phone, Clock } from "lucide-react"
import Image from "next/image"

interface ContentItem {
  section: string
  key: string
  value: string
}

interface User {
  id: string
  email: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadContent()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify")
      const data = await response.json()

      if (data.authenticated) {
        setUser(data.user)
      } else {
        router.push("/admin/login")
      }
    } catch (error) {
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const loadContent = async () => {
    try {
      const response = await fetch("/api/content")
      const data = await response.json()
      setContent(data.content || [])
    } catch (error) {
      console.error("Failed to load content:", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const updateContent = async (section: string, key: string, value: string) => {
    setSaving(true)
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, key, value }),
      })

      if (response.ok) {
        setMessage("Content updated successfully!")
        setTimeout(() => setMessage(""), 3000)
        loadContent()
      } else {
        setMessage("Failed to update content")
      }
    } catch (error) {
      setMessage("Error updating content")
    } finally {
      setSaving(false)
    }
  }

  const getContentValue = (section: string, key: string) => {
    const item = content.find((c) => c.section === section && c.key === key)
    return item?.value || ""
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/spotless-logo.png"
                alt="Spotless Cleaning Logo"
                width={200}
                height={67}
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400">Welcome, {user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="mb-4 p-4 bg-green-900 border border-green-700 rounded-lg text-green-300">{message}</div>
        )}

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="hero" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <FileText className="h-4 w-4 mr-2" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Settings className="h-4 w-4 mr-2" />
              About Us
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Phone className="h-4 w-4 mr-2" />
              Contact Info
            </TabsTrigger>
            <TabsTrigger value="hours" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Clock className="h-4 w-4 mr-2" />
              Business Hours
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Hero Section</CardTitle>
                <CardDescription className="text-gray-400">
                  Edit the main headline and description on your homepage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title" className="text-gray-300">
                    Main Headline
                  </Label>
                  <Input
                    id="hero-title"
                    defaultValue={getContentValue("hero", "title")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("hero", "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle" className="text-gray-300">
                    Subtitle
                  </Label>
                  <Textarea
                    id="hero-subtitle"
                    defaultValue={getContentValue("hero", "subtitle")}
                    className="bg-gray-800 border-gray-600 text-white"
                    rows={3}
                    onBlur={(e) => updateContent("hero", "subtitle", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">About Us Section</CardTitle>
                <CardDescription className="text-gray-400">
                  Edit your company description and about us content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-title" className="text-gray-300">
                    Section Title
                  </Label>
                  <Input
                    id="about-title"
                    defaultValue={getContentValue("about", "title")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("about", "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="about-description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="about-description"
                    defaultValue={getContentValue("about", "description")}
                    className="bg-gray-800 border-gray-600 text-white"
                    rows={5}
                    onBlur={(e) => updateContent("about", "description", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
                <CardDescription className="text-gray-400">Update your phone numbers and email address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone1" className="text-gray-300">
                    Primary Phone
                  </Label>
                  <Input
                    id="phone1"
                    defaultValue={getContentValue("contact", "phone1")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("contact", "phone1", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone2" className="text-gray-300">
                    Secondary Phone
                  </Label>
                  <Input
                    id="phone2"
                    defaultValue={getContentValue("contact", "phone2")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("contact", "phone2", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={getContentValue("contact", "email")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("contact", "email", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours">
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Business Hours</CardTitle>
                <CardDescription className="text-gray-400">Update your operating hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weekdays" className="text-gray-300">
                    Monday - Friday
                  </Label>
                  <Input
                    id="weekdays"
                    defaultValue={getContentValue("hours", "weekdays")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("hours", "weekdays", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="saturday" className="text-gray-300">
                    Saturday
                  </Label>
                  <Input
                    id="saturday"
                    defaultValue={getContentValue("hours", "saturday")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("hours", "saturday", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sunday" className="text-gray-300">
                    Sunday
                  </Label>
                  <Input
                    id="sunday"
                    defaultValue={getContentValue("hours", "sunday")}
                    className="bg-gray-800 border-gray-600 text-white"
                    onBlur={(e) => updateContent("hours", "sunday", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button
            onClick={() => window.open("/", "_blank")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            View Live Website
          </Button>
        </div>
      </div>
    </div>
  )
}
