"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Car, Utensils, Users, Bed, Square, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock room data - in a real app, this would come from a database
const rooms = [
  {
    id: 1,
    name: "Executive Suite",
    price: 1200,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3686c6f1-8b1d-4e96-97cd-8914e46cd595-P9cOJeWXRyn7z1WEDQ27u49KbmylMy.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOUR%20SEASONS%20HOTEL%20BANGKOK%20AT%20CHAO%20PHRAYA%20RIVER%E2%80%A6-3iSDRGkE8vrablnUp3hmgLGl5IYDRt.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1cfe77e-62ab-4b13-8438-576b11b09213-LaWfnihLQJo3M1aSx1ti48L1gxjHLo.jpeg",
    ],
    capacity: 2,
    beds: 1,
    size: 45,
    amenities: ["WiFi", "Breakfast", "Parking", "Room Service", "Air Conditioning", "Mini Bar"],
    description:
      "Experience luxury at its finest in our Executive Suite. This spacious accommodation features modern amenities, elegant furnishings, and stunning city views. Perfect for business travelers and couples seeking a premium experience.",
    features: [
      "King-size bed with premium linens",
      "Separate living area with sofa",
      "Work desk with ergonomic chair",
      "Marble bathroom with rain shower",
      "City skyline views",
      "Complimentary breakfast",
      "24/7 room service",
      "High-speed WiFi",
    ],
    available: true,
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 800,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Enjoy%20the%20charm%20and%20comfort%20of%20our%20Deluxe%20Double%E2%80%A6-fZcpPv7Vmyb6CZ8AVcyPLDmYOdms7H.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ed356f84-4d8e-45bd-8646-1b83f410e11c-Rds6BUxxHTRSD8P50srriI5fP3R0Cb.jpeg",
    ],
    capacity: 2,
    beds: 1,
    size: 32,
    amenities: ["WiFi", "Breakfast", "Parking", "Air Conditioning"],
    description:
      "Our Deluxe Room offers comfort and elegance with carefully selected furnishings and premium bedding. Ideal for travelers who appreciate quality and style.",
    features: [
      "Queen-size bed with luxury linens",
      "Modern bathroom with shower",
      "Work area with desk",
      "Climate control",
      "Complimentary breakfast",
      "Free parking",
      "High-speed WiFi",
    ],
    available: true,
  },
]

const amenityIcons = {
  WiFi: Wifi,
  Breakfast: Coffee,
  Parking: Car,
  "Room Service": Utensils,
  Kitchen: Utensils,
  "Air Conditioning": Square,
  "Mini Bar": Coffee,
  "Washing Machine": Square,
}

export default function RoomDetailsPage() {
  const params = useParams()
  const roomId = Number.parseInt(params?.id as string)
  const room = rooms.find((r) => r.id === roomId)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!room) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold mb-4">Room Not Found</h1>
            <p className="text-muted-foreground mb-8">The room you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/rooms">Back to Rooms</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/rooms" className="text-primary hover:underline">
            ← Back to Rooms
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative h-96 mb-4">
              <img
                src={room.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${room.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {room.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                GH₵{room.price}/night
              </Badge>
            </div>

            {/* Thumbnail Images */}
            {room.images.length > 1 && (
              <div className="flex space-x-2 mb-6">
                {room.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Room Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">{room.name}</h1>
                <div className="flex items-center space-x-6 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Up to {room.capacity} guests
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {room.beds} bed{room.beds > 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {room.size}m²
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">{room.description}</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Room Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {room.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi
                      return (
                        <div key={amenity} className="flex items-center">
                          <Icon className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Card removed: right column now empty for static site */}
        </div>
      </main>

      <Footer />
    </div>
  )
}
