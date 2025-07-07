"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Upload, CheckCircle, Home, Building, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SpotlessCleaningLanding() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [adminMode, setAdminMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  })

  // Check for admin activation on page load
  useEffect(() => {
    // Listen for Ctrl+Shift+A to activate admin
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault()
        setAdminMode(true)
        alert("Admin mode activated!")
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { formData, uploadedFiles })
    alert("Thank you! We'll review your photos and send you an estimate within 24 hours.")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/spotless-logo.png"
                alt="Spotless Cleaning Logo"
                width={600}
                height={200}
                className="h-48 w-auto cursor-pointer"
                onClick={() => {
                  // Simple click counter for logo
                  const clicks = Number.parseInt(localStorage.getItem("logoClicks") || "0") + 1
                  localStorage.setItem("logoClicks", clicks.toString())

                  if (clicks >= 5) {
                    localStorage.removeItem("logoClicks")
                    setAdminMode(true)
                    alert("Admin mode activated!")
                  }

                  // Reset counter after 3 seconds
                  setTimeout(() => {
                    if (Number.parseInt(localStorage.getItem("logoClicks") || "0") < 5) {
                      localStorage.removeItem("logoClicks")
                    }
                  }, 3000)
                }}
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Services
              </Link>
              <Link href="#gallery" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Gallery
              </Link>
              <Link href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link href="#estimate" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Get Estimate
              </Link>
              <Link href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Contact
              </Link>
              <a href="tel:613-888-1762">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500 text-black hover:bg-yellow-500 font-semibold">
                Professional Window Cleaning
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">Crystal Clear Windows, Every Time</h2>
              <p className="text-xl text-gray-300 mb-8">
                Professional window cleaning services for homes and businesses. Upload photos of your windows and get a
                free estimate!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Upload className="h-5 w-5 mr-2" />
                  Get Free Estimate
                </Button>
                <a href="tel:613-888-1762">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    613-888-1762
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero-window-cleaner.png"
                alt="Professional window cleaner in black uniform using squeegee to clean large commercial window"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Services</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide comprehensive window cleaning services for residential and commercial properties
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden bg-black border-gray-800">
              <div className="relative h-48 w-full">
                <Image
                  src="/house-residential.webp"
                  alt="Beautiful residential home with clean windows and well-maintained landscaping"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <Home className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-white">Residential Cleaning</CardTitle>
                <CardDescription className="text-gray-400">
                  Professional window cleaning for homes, apartments, and condos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Interior & exterior windows
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Screen cleaning
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Sill & frame cleaning
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden bg-black border-gray-800">
              <div className="relative h-48 w-full">
                <Image
                  src="/commercial-street.png"
                  alt="Historic downtown commercial district with brick storefronts and businesses"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <Building className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-white">Commercial Cleaning</CardTitle>
                <CardDescription className="text-gray-400">
                  Regular maintenance for offices, retail stores, and buildings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Scheduled maintenance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Storefront cleaning
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Sign cleaning
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before & After Gallery Section */}
      <section id="gallery" className="py-16 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Work</h3>
            <p className="text-xl text-gray-300">See our professional window cleaning process and results</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-black border-gray-700">
              <div className="relative">
                <Image
                  src="/window-cleaning-1.webp"
                  alt="Professional window cleaner using squeegee on residential window"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-300">Professional cleaning technique</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-black border-gray-700">
              <div className="relative">
                <Image
                  src="/window-cleaning-2.jpg"
                  alt="Window cleaner working on residential windows with squeegee"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-300">Thorough cleaning of residential windows</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-black border-gray-700">
              <div className="relative">
                <Image
                  src="/window-clean-after.avif"
                  alt="Crystal clear clean windows reflecting the sky"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-300">Perfect results - crystal clear windows</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Why Choose Spotless Cleaning?</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Professional Equipment</h4>
                  <p className="text-gray-300">We use industry-leading tools and eco-friendly cleaning solutions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Satisfaction Guaranteed</h4>
                  <p className="text-gray-300">{"We're not happy until you're completely satisfied with our work"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Flexible Scheduling</h4>
                  <p className="text-gray-300">We work around your schedule with convenient appointment times</p>
                </div>
              </div>
            </div>
            <Link href="#about">
              <Button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Learn More About Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 lg:py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">About Spotless Cleaning</h3>
            <p className="text-xl text-gray-300">Learn more about our commitment to excellence</p>
          </div>

          <Card className="bg-black border-gray-700">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Image
                  src="/spotless-logo.png"
                  alt="Spotless Cleaning Logo"
                  width={400}
                  height={133}
                  className="h-32 w-auto mx-auto mb-6"
                />
              </div>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  We are a small local business that emphasizes{" "}
                  <span className="text-yellow-400 font-semibold">quality over quantity</span>. This means we take pride
                  in our work and truly care about our customers.
                </p>

                <p>
                  Creating a lasting relationship with our customers is of the utmost importance to us. We believe that
                  exceptional service goes beyond just cleaning windows – it's about building trust, reliability, and
                  genuine care for every property we service.
                </p>

                <div className="text-center py-6">
                  <blockquote className="text-2xl font-bold text-yellow-400 italic">"We really do care"</blockquote>
                </div>

                <p>
                  When you choose Spotless Cleaning, you're not just hiring a service – you're partnering with a team
                  that treats your property with the same care and attention we would give our own. Every window we
                  clean reflects our commitment to excellence and our dedication to your complete satisfaction.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Photo Upload Estimate Section */}
      <section id="estimate" className="py-16 lg:py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Get Your Free Estimate</h3>
            <p className="text-xl text-gray-300">
              Upload photos of your windows and we'll send you a detailed estimate
            </p>
          </div>

          <Card className="shadow-lg bg-black border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Upload className="h-5 w-5 mr-2 text-yellow-500" />
                Upload Photos & Contact Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Please provide your contact details and upload photos of the windows you'd like cleaned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(613) 888-1762"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-300">
                      Property Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Main St, City, State"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="photos" className="text-gray-300">
                    Upload Photos of Your Windows
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="bg-gray-800 border-gray-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      Upload photos of all windows that you would like cleaned
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Uploaded Photos:</h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                            <span className="text-sm text-gray-300">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 hover:bg-gray-600"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300">
                    Additional Details
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your windows, preferred timing, or any special requirements..."
                    rows={4}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Send Photos & Get Free Estimate
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-xl text-gray-300">Ready to get started? Get in touch with us today!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-black border-gray-800">
              <CardHeader>
                <Phone className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <CardTitle className="text-white">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-2">Ready to schedule?</p>
                <a href="tel:613-888-1762" className="text-lg font-semibold text-yellow-500 hover:text-yellow-400">
                  613-888-1762
                </a>
                <span className="text-gray-400"> / </span>
                <a href="tel:613-484-5595" className="text-lg font-semibold text-yellow-500 hover:text-yellow-400">
                  613-484-5595
                </a>
              </CardContent>
            </Card>

            <Card className="text-center bg-black border-gray-800">
              <CardHeader>
                <Mail className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <CardTitle className="text-white">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-2">Send us a message</p>
                <a
                  href="mailto:spotlessclnrs@gmail.com"
                  className="text-lg font-semibold text-yellow-500 hover:text-yellow-400"
                >
                  spotlessclnrs@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center bg-black border-gray-800">
              <CardHeader>
                <MapPin className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <CardTitle className="text-white">Service Area</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-2">We serve</p>
                <p className="text-lg font-semibold text-white">Greater Kingston Area</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/spotless-logo.png"
                  alt="Spotless Cleaning Logo"
                  width={560}
                  height={186}
                  className="h-40 w-auto"
                />
              </div>
              <p className="text-gray-400">Professional window cleaning services you can trust.</p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Residential Cleaning</li>
                <li>Commercial Cleaning</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="tel:613-888-1762" className="hover:text-yellow-400">
                    613-888-1762
                  </a>
                  <span> / </span>
                  <a href="tel:613-484-5595" className="hover:text-yellow-400">
                    613-484-5595
                  </a>
                </li>
                <li>
                  <a href="mailto:spotlessclnrs@gmail.com" className="hover:text-yellow-400">
                    spotlessclnrs@gmail.com
                  </a>
                </li>
                <li>Greater Kingston Area</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Hours</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Mon-Fri: 8AM-5PM</li>
                <li>Saturday: Closed</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Spotless Cleaning. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Admin Panel - Only visible when adminMode is true */}
      {adminMode && (
        <div className="bg-gray-900 border-t border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Website Admin Panel</h2>
              <Button onClick={() => setAdminMode(false)} variant="outline" className="border-gray-600 text-gray-300">
                Hide Admin
              </Button>
            </div>

            <div className="grid gap-6">
              {/* Hero Section Editing */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Main Headline & Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-gray-300 text-sm">Main Headline</Label>
                    <Input
                      defaultValue="Crystal Clear Windows, Every Time"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Description</Label>
                    <Textarea
                      defaultValue="Professional window cleaning services for homes and businesses. Upload photos of your windows and get a free estimate!"
                      className="bg-gray-800 border-gray-600 text-white"
                      rows={2}
                    />
                  </div>
                  <Button
                    onClick={() => alert("Hero section updated! (Changes will be visible after page refresh)")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Save Hero Section
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info Editing */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-gray-300 text-sm">Primary Phone</Label>
                    <Input defaultValue="613-888-1762" className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Secondary Phone</Label>
                    <Input defaultValue="613-484-5595" className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Email Address</Label>
                    <Input defaultValue="spotlessclnrs@gmail.com" className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                  <Button
                    onClick={() => alert("Contact info updated! (Changes will be visible after page refresh)")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Save Contact Info
                  </Button>
                </CardContent>
              </Card>

              {/* Business Hours Editing */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-gray-300 text-sm">Monday - Friday</Label>
                    <Input defaultValue="8AM-5PM" className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Saturday</Label>
                    <Input defaultValue="Closed" className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Sunday</Label>
                    <Input defaultValue="Closed" className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                  <Button
                    onClick={() => alert("Business hours updated! (Changes will be visible after page refresh)")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Save Business Hours
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>💡 Admin activated! Click "Hide Admin" to return to normal view.</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Activation Instructions - Only visible when not in admin mode */}
      {!adminMode && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded text-xs opacity-20 hover:opacity-100 transition-opacity">
          <p>Admin: Click logo 5 times quickly</p>
          <p>Or press Ctrl+Shift+A</p>
        </div>
      )}
    </div>
  )
}
