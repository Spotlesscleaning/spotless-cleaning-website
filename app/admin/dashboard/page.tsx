"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LogOut, FileText, Phone, Clock } from "lucide-react"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("admin-logged-in")
    if (!isLoggedIn) {
      router.push("/admin/login")
    } else {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-logged-in")
    router.push("/admin/login")
  }

  const handleSave = (section: string, field: string, value: string) => {
    setMessage(`Updated ${section} - ${field}`)
    setTimeout(() => setMessage(""), 3000)
    // In a real app, this would save to database
    console.log("Saving:", { section, field, value })
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
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-xl font-bold text-white">Spotless Cleaning Admin</h1>
              <p className="text-gray-400">Manage your website content</p>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="mb-4 p-4 bg-green-900 border border-green-700 rounded-lg text-green-300">{message}</div>
        )}

        <div className="grid gap-6">
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-yellow-500" />
                Hero Section
              </CardTitle>
              <CardDescription className="text-gray-400">Edit the main headline and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title" className="text-gray-300">
                  Main Headline
                </Label>
                <Input
                  id="hero-title"
                  defaultValue="Crystal Clear Windows, Every Time"
                  className="bg-gray-800 border-gray-600 text-white"
                  onBlur={(e) => handleSave("hero", "title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle" className="text-gray-300">
                  Subtitle
                </Label>
                <Textarea
                  id="hero-subtitle"
                  defaultValue="Professional window cleaning services for homes and businesses. Upload photos of your windows and get a free estimate!"
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={3}
                  onBlur={(e) => handleSave("hero", "subtitle", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Phone className="h-5 w-5 mr-2 text-yellow-500" />
                Contact Information
              </CardTitle>
              <CardDescription className="text-gray-400">Update phone numbers and email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone1" className="text-gray-300">
                  Primary Phone
                </Label>
                <Input
                  id="phone1"
                  defaultValue="613-888-1762"
                  className="bg-gray-800 border-gray-600 text-white"
                  onBlur={(e) => handleSave("contact", "phone1", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone2" className="text-gray-300">
                  Secondary Phone
                </Label>
                <Input
                  id="phone2"
                  defaultValue="613-484-5595"
                  className="bg-gray-800 border-gray-600 text-white"
                  onBlur={(e) => handleSave("contact", "phone2", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="spotlessclnrs@gmail.com"
                  className="bg-gray-800 border-gray-600 text-white"
                  onBlur={(e) => handleSave("contact", "email", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                Business Hours
              </CardTitle>
              <CardDescription className="text-gray-400">Update your operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="weekdays" className="text-gray-300">
                  Monday - Friday
                </Label>
                <Input
                  id="weekdays"
                  defaultValue="8AM-5PM"
                  className="bg-gray-800 border-gray-600 text-white"
                  onBlur={(e) => handleSave("hours", "weekdays", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="saturday" className="text-gray-300">
                  Saturday
                </Label>
                <Input
                  id="saturday"
                  defaultValue="Closed"
                  className="bg-gray-800 border-gray-600 text-white"
                  onBlur={(e) => handleSave("hours", "saturday", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sunday" className="text-gray-300">
                  Sunday
                </Label>
                <Input
                  id="sunday"
                  defaultValue="Closed"
                  className="bg-gray-800 border-gray-600 text-white"
                  onBlur={(e) => handleSave("hours", "sunday", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

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
