import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Car, Utensils, Users, Bed, Square } from "lucide-react"
import Link from "next/link"

interface Room {
  id: number
  name: string
  price: number
  images: string[]
  capacity: number
  beds: number
  size: number
  amenities: string[]
  description: string
  available: boolean
}

interface RoomCardProps {
  room: Room
  checkIn: string
  checkOut: string
  guests: string
}

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

export function RoomCard({ room, checkIn, checkOut, guests }: RoomCardProps) {
  const bookingUrl = `/rooms/${room.id}/book?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img src={room.images[0] || "/placeholder.svg"} alt={room.name} className="w-full h-full object-cover" />
        <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">GH₵{room.price}/night</Badge>
        {!room.available && (
          <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">Not Available</Badge>
        )}
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
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {room.size}m²
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{room.description}</p>
        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi
            return (
              <div
                key={amenity}
                className="flex items-center text-xs text-muted-foreground bg-accent px-2 py-1 rounded"
              >
                <Icon className="w-3 h-3 mr-1" />
                {amenity}
              </div>
            )
          })}
          {room.amenities.length > 4 && (
            <div className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
              +{room.amenities.length - 4} more
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1 bg-transparent" asChild>
          <Link href={`/rooms/${room.id}`}>View Details</Link>
        </Button>
          <Button className="flex-1" disabled={!room.available}>
            {room.available ? "Available" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  )
}
