// File removed
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, DollarSign, Home, Plus, Edit, Trash2, Check, X, Search } from "lucide-react"



const mockRooms = [
  {
    id: 1,
    name: "Executive Suite",
    price: 1200,
    capacity: 2,
    beds: 1,
    size: 45,
    available: true,
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 800,
    capacity: 2,
    beds: 1,
    size: 32,
    available: true,
  },
]


export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("/api/bookings")
      const data = await res.json()
      setBookings(data)
    }
    fetchBookings()
  }, [])
  const [rooms, setRooms] = useState(mockRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [newRoom, setNewRoom] = useState({
    name: "",
    price: "",
    capacity: "",
    beds: "",
    size: "",
    description: "",
  })
  const [expanded, setExpanded] = useState<{ [bookingId: number]: boolean }>({})

  const toggleExpand = (bookingId: number) => {
    setExpanded((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }))
  }

  // Redirect to login if not authenticated
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  if (!session) {
    router.replace("/admin/login")
    return null
  }

  // Update or delete booking in DB
  const updateBookingStatus = async (bookingId: string, status: string) => {
    if (status === "cancelled") {
      // Delete booking from DB
      await fetch(`/api/bookings?id=${bookingId}`, { method: "DELETE" })
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId))
    } else {
      // Update booking status in DB
      await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bookings.find((b) => b._id === bookingId), status }),
      })
      setBookings((prev) => prev.map((booking) => booking._id === bookingId ? { ...booking, status } : booking))
    }
  }

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.guestName || booking.firstName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.room || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + (b.total || 0), 0)

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault()
    const room = {
      id: rooms.length + 1,
      name: newRoom.name,
      price: Number.parseInt(newRoom.price),
      capacity: Number.parseInt(newRoom.capacity),
      beds: Number.parseInt(newRoom.beds),
      size: Number.parseInt(newRoom.size),
      available: true,
    }
    setRooms((prev) => [...prev, room])
    setNewRoom({
      name: "",
      price: "",
      capacity: "",
      beds: "",
      size: "",
      description: "",
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your guesthouse bookings and rooms</p>
        </div>
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="add-room">Add Room</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Bookings</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBookings.map((booking) => {
                    const room = rooms.find((r) => r.name === booking.room)
                    return (
                      <div key={booking._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{booking.guestName}</h4>
                            <p className="text-sm text-muted-foreground">{booking.email}</p>
                          </div>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Room:</span>
                            <p className="font-medium">{booking.room}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Check-in:</span>
                            <p className="font-medium">{booking.checkIn}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Check-out:</span>
                            <p className="font-medium">{booking.checkOut}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>
                            <p className="font-medium">GH₵{booking.total}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline" onClick={() => toggleExpand(booking._id)}>
                            {expanded[booking._id] ? "Hide Details" : "View Details"}
                          </Button>
                          {booking.status !== "cancelled" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateBookingStatus(booking._id, "cancelled")}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                          {booking.status === "pending" && (
                            <Button size="sm" onClick={() => updateBookingStatus(booking._id, "confirmed")}> 
                              <Check className="w-4 h-4 mr-1" />
                              Confirm
                            </Button>
                          )}
                        </div>
                        {expanded[booking._id] && room && (
                          <div className="mt-4 bg-accent/30 p-4 rounded">
                            <h5 className="font-semibold mb-2">Room Details</h5>
                            <ul className="text-sm space-y-1">
                              <li><b>Name:</b> {room.name}</li>
                              <li><b>Price:</b> GH₵{room.price}/night</li>
                              <li><b>Capacity:</b> {room.capacity} guests</li>
                              <li><b>Beds:</b> {room.beds}</li>
                              <li><b>Size:</b> {room.size}m²</li>
                              <li><b>Status:</b> {room.available ? "Available" : "Unavailable"}</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="add-room">
            <Card>
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddRoom} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="roomName">Room Name</Label>
                      <Input
                        id="roomName"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomPrice">Price per Night (GH₵)</Label>
                      <Input
                        id="roomPrice"
                        type="number"
                        value={newRoom.price}
                        onChange={(e) => setNewRoom((prev) => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomCapacity">Capacity (Guests)</Label>
                      <Input
                        id="roomCapacity"
                        type="number"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom((prev) => ({ ...prev, capacity: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomBeds">Number of Beds</Label>
                      <Input
                        id="roomBeds"
                        type="number"
                        value={newRoom.beds}
                        onChange={(e) => setNewRoom((prev) => ({ ...prev, beds: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomSize">Size (m²)</Label>
                      <Input
                        id="roomSize"
                        type="number"
                        value={newRoom.size}
                        onChange={(e) => setNewRoom((prev) => ({ ...prev, size: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="roomDescription">Description</Label>
                    <Textarea
                      id="roomDescription"
                      value={newRoom.description}
                      onChange={(e) => setNewRoom((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Room
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
