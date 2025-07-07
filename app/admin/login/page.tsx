"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Email entered:", email)
    console.log("Password entered:", password)

    // Super simple check - just go to dashboard regardless
    localStorage.setItem("admin-logged-in", "true")
    router.push("/admin/dashboard")
  }

  // Skip login button for testing
  const skipLogin = () => {
    localStorage.setItem("admin-logged-in", "true")
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-black border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-white">Admin Login</CardTitle>
          <CardDescription className="text-gray-400">Access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@spotlesscleaning.com"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Sign In (Any Credentials)
            </Button>
          </form>

          <div className="mt-4">
            <Button
              onClick={skipLogin}
              variant="outline"
              className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              Skip Login - Go to Dashboard
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            <p>For testing: Click "Skip Login" or enter anything and click Sign In</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
