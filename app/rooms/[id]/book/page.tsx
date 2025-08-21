"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, CreditCard, Check } from "lucide-react"
import Link from "next/link"

// Mock room data
const rooms = [
  {
    id: 1,
    name: "Executive Suite",
    price: 1200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3686c6f1-8b1d-4e96-97cd-8914e46cd595-P9cOJeWXRyn7z1WEDQ27u49KbmylMy.jpeg",
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Enjoy%20the%20charm%20and%20comfort%20of%20our%20Deluxe%20Double%E2%80%A6-fZcpPv7Vmyb6CZ8AVcyPLDmYOdms7H.jpeg",
  },
]

export default function BookingPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const roomId = Number.parseInt(params?.id as string)
  const room = rooms.find((r) => r.id === roomId)

  const [formData, setFormData] = useState({
    checkIn: searchParams?.get("checkin") || "",
    checkOut: searchParams?.get("checkout") || "",
    guests: searchParams?.get("guests") || "2",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  if (!room) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold mb-4">Room Not Found</h1>
            <Button asChild>
              <Link href="/rooms">Back to Rooms</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = nights * room.price
  const taxes = subtotal * 0.15 // 15% tax
  const total = subtotal + taxes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create booking in DB
    let bookingRes, bookingData
    try {
      bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          room: room.name,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: Number(formData.guests),
          total: total,
          status: "pending",
        }),
      })
      if (!bookingRes.ok) throw new Error("Booking failed")
      bookingData = await bookingRes.json()
    } catch (error) {
      setIsSubmitting(false)
      alert("Failed to create booking. Please try again.")
      return
    }

    // Send booking confirmation email (correct fields)
    try {
      const subject = `Booking Confirmation for ${room.name}`
      const html = `
        <h2>Thank you for your booking, ${formData.firstName} ${formData.lastName}!</h2>
        <p>Your reservation for <b>${room.name}</b> is confirmed.</p>
        <ul>
          <li><b>Check-in:</b> ${formData.checkIn}</li>
          <li><b>Check-out:</b> ${formData.checkOut}</li>
          <li><b>Guests:</b> ${formData.guests}</li>
          <li><b>Total:</b> GH₵${total.toFixed(2)}</li>
        </ul>
        <p>We look forward to hosting you!</p>
      `
      const emailRes = await fetch("/api/email/booking-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email,
          subject,
          html,
        }),
      })
      if (!emailRes.ok) throw new Error("Email failed")
    } catch (error) {
      alert("Booking saved, but failed to send confirmation email.")
      setIsSubmitting(false)
      setIsBooked(true)
      return
    }

    setIsSubmitting(false)
    setIsBooked(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isBooked) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
              <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-serif font-bold text-green-800 mb-4">Booking Confirmed!</h1>
              <p className="text-green-700 mb-6">Your reservation for {room.name} has been successfully confirmed.</p>
              <div className="bg-white rounded-lg p-4 text-left">
                <h3 className="font-semibold mb-2">Booking Details:</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Room:</strong> {room.name}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {formData.checkIn}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {formData.checkOut}
                  </p>
                  <p>
                    <strong>Guests:</strong> {formData.guests}
                  </p>
                  <p>
                    <strong>Total:</strong> GH₵{total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/bookings">View My Bookings</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <Link href={`/rooms/${room.id}`} className="text-primary hover:underline">
            ← Back to Room Details
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Stay Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Stay Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="checkIn">Check-in Date</Label>
                        <div className="relative">
                          <Input
                            id="checkIn"
                            name="checkIn"
                            type="date"
                            value={formData.checkIn}
                            onChange={handleInputChange}
                            required
                            className="pl-10"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="checkOut">Check-out Date</Label>
                        <div className="relative">
                          <Input
                            id="checkOut"
                            name="checkOut"
                            type="date"
                            value={formData.checkOut}
                            onChange={handleInputChange}
                            required
                            className="pl-10"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <div className="relative">
                          <Input
                            id="guests"
                            name="guests"
                            type="number"
                            min="1"
                            max="8"
                            value={formData.guests}
                            onChange={handleInputChange}
                            required
                            className="pl-10"
                          />
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requests or requirements..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Processing Booking..."
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Confirm Booking - GH₵{total.toFixed(2)}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{room.name}</h4>
                    <p className="text-sm text-muted-foreground">GH₵{room.price}/night</p>
                  </div>
                </div>

                {formData.checkIn && formData.checkOut && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Check-in:</span>
                      <span>{formData.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Check-out:</span>
                      <span>{formData.checkOut}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Guests:</span>
                      <span>{formData.guests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Nights:</span>
                      <span>{nights}</span>
                    </div>
                  </div>
                )}

                {nights > 0 && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>GH₵{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes & Fees:</span>
                      <span>GH₵{taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>GH₵{total.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4 text-xs text-muted-foreground">
                  <p>• Free cancellation up to 24 hours before check-in</p>
                  <p>• No hidden fees</p>
                  <p>• Secure payment processing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
