"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Users, Search } from "lucide-react"
import Link from "next/link"

const heroImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3686c6f1-8b1d-4e96-97cd-8914e46cd595-P9cOJeWXRyn7z1WEDQ27u49KbmylMy.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOUR%20SEASONS%20HOTEL%20BANGKOK%20AT%20CHAO%20PHRAYA%20RIVER%E2%80%A6-3iSDRGkE8vrablnUp3hmgLGl5IYDRt.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1cfe77e-62ab-4b13-8438-576b11b09213-LaWfnihLQJo3M1aSx1ti48L1gxjHLo.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ed356f84-4d8e-45bd-8646-1b83f410e11c-Rds6BUxxHTRSD8P50srriI5fP3R0Cb.jpeg",
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Luxury suite ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Luxury Redefined</h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Experience unparalleled comfort and elegance at Stay With Ease, your premier destination in Kumasi.
        </p>
        <p className="text-lg mb-12 text-white/80">Premium accommodations from GH₵400 - GH₵1,500 per night</p>

        {/* Booking Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Check-in Date</label>
              <div className="relative">
                <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-10" />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Check-out Date</label>
              <div className="relative">
                <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-10" />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Guests</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="8"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="pl-10"
                />
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <Button size="lg" className="w-full" asChild>
              <Link href={`/rooms?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`}>
                <Search className="w-4 h-4 mr-2" />
                Check Availability
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentImage ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
