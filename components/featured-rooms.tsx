import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Car, Utensils, Users, Bed } from "lucide-react"
import Link from "next/link"

const featuredRooms = [
  {
    id: 1,
    name: "Executive Suite",
    price: 1200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3686c6f1-8b1d-4e96-97cd-8914e46cd595-P9cOJeWXRyn7z1WEDQ27u49KbmylMy.jpeg",
    capacity: 2,
    beds: 1,
    amenities: ["WiFi", "Breakfast", "Parking", "Room Service"],
    description: "Spacious suite with modern amenities and stunning city views.",
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Enjoy%20the%20charm%20and%20comfort%20of%20our%20Deluxe%20Double%E2%80%A6-fZcpPv7Vmyb6CZ8AVcyPLDmYOdms7H.jpeg",
    capacity: 2,
    beds: 1,
    amenities: ["WiFi", "Breakfast", "Parking"],
    description: "Comfortable room with elegant furnishings and premium bedding.",
  },
  {
    id: 3,
    name: "Premium Apartment",
    price: 1500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1cfe77e-62ab-4b13-8438-576b11b09213-LaWfnihLQJo3M1aSx1ti48L1gxjHLo.jpeg",
    capacity: 4,
    beds: 2,
    amenities: ["WiFi", "Kitchen", "Parking", "Room Service"],
    description: "Fully furnished apartment with kitchen and living area.",
  },
]

const amenityIcons = {
  WiFi: Wifi,
  Breakfast: Coffee,
  Parking: Car,
  "Room Service": Utensils,
  Kitchen: Utensils,
}

export function FeaturedRooms() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Featured Accommodations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of luxury rooms and suites, each designed to provide the ultimate
            comfort and elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                  GH₵{room.price}/night
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-serif">{room.name}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {room.capacity} guests
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {room.beds} bed{room.beds > 1 ? "s" : ""}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{room.description}</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi
                    return (
                      <div key={amenity} className="flex items-center text-xs text-muted-foreground">
                        <Icon className="w-3 h-3 mr-1" />
                        {amenity}
                      </div>
                    )
                  })}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full" asChild>
                    <Link href={`/rooms/${room.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/rooms">View All Rooms</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
