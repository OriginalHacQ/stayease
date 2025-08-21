"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomCard } from "@/components/room-card"
import { RoomFilters } from "@/components/room-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Users, Search } from "lucide-react"

const rooms = [
  {
    id: 1,
    name: "Executive Suite",
    price: 1200,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3686c6f1-8b1d-4e96-97cd-8914e46cd595-P9cOJeWXRyn7z1WEDQ27u49KbmylMy.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOUR%20SEASONS%20HOTEL%20BANGKOK%20AT%20CHAO%20PHRAYA%20RIVER%E2%80%A6-3iSDRGkE8vrablnUp3hmgLGl5IYDRt.jpeg",
    ],
    capacity: 2,
    beds: 1,
    size: 45,
    amenities: ["WiFi", "Breakfast", "Parking", "Room Service", "Air Conditioning", "Mini Bar"],
    description: "Spacious suite with modern amenities and stunning city views.",
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
    description: "Comfortable room with elegant furnishings and premium bedding.",
    available: true,
  },
  {
    id: 3,
    name: "Premium Apartment",
    price: 1500,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1cfe77e-62ab-4b13-8438-576b11b09213-LaWfnihLQJo3M1aSx1ti48L1gxjHLo.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kitchen%20decor%20ideas%20%F0%9F%8E%80-PGTPQyEf3UZUpitzviXdM14ZVuXx84.jpeg",
    ],
    capacity: 4,
    beds: 2,
    size: 65,
    amenities: ["WiFi", "Kitchen", "Parking", "Room Service", "Air Conditioning", "Washing Machine"],
    description: "Fully furnished apartment with kitchen and living area.",
    available: true,
  },
  {
    id: 4,
    name: "Standard Room",
    price: 400,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Enjoy%20the%20charm%20and%20comfort%20of%20our%20Deluxe%20Double%E2%80%A6-fZcpPv7Vmyb6CZ8AVcyPLDmYOdms7H.jpeg",
    ],
    capacity: 2,
    beds: 1,
    size: 25,
    amenities: ["WiFi", "Air Conditioning"],
    description: "Comfortable and affordable accommodation with essential amenities.",
    available: true,
  },
  {
    id: 5,
    name: "Family Suite",
    price: 1000,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIMPLE%20YET%20ELEGANT%20LIVING%20ROOM%20%E2%9C%A8-Bhmn43KhpSN1Ez8O1ZhFare64OrPe1.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/For%20rent%201%20Bedroom%20Apartment%20%20Location_%20Lekki%E2%80%A6-1D1u95h6tA4wYM2nNkXyjSEVdN2h3O.jpeg",
    ],
    capacity: 6,
    beds: 3,
    size: 55,
    amenities: ["WiFi", "Breakfast", "Parking", "Kitchen", "Air Conditioning"],
    description: "Perfect for families with separate bedrooms and living space.",
    available: true,
  },
]

export default function RoomsPage() {
  const searchParams = useSearchParams()
  const [filteredRooms, setFilteredRooms] = useState(rooms)
  const [checkIn, setCheckIn] = useState(searchParams.get("checkin") || "")
  const [checkOut, setCheckOut] = useState(searchParams.get("checkout") || "")
  const [guests, setGuests] = useState(searchParams.get("guests") || "2")
  const [priceRange, setPriceRange] = useState([400, 1500])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  useEffect(() => {
    const filtered = rooms.filter((room) => {
      const matchesCapacity = Number.parseInt(guests) <= room.capacity
      const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1]
      const matchesAmenities =
        selectedAmenities.length === 0 || selectedAmenities.every((amenity) => room.amenities.includes(amenity))

      return matchesCapacity && matchesPrice && matchesAmenities
    })

    setFilteredRooms(filtered)
  }, [guests, priceRange, selectedAmenities])

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
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
            <Button size="lg" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Update Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <RoomFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
            />
          </div>

          {/* Room Results */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-serif font-bold">Available Rooms ({filteredRooms.length})</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} />
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No rooms match your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
