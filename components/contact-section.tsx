import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">Contact us today for more information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Stay With Ease Luxury Avenue
                <br />
                Ahodwo, Kumasi
                <br />
                Ghana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Phone</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                +233 20 892 4935
                <br />
                +233 20 892 4935
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                info@staywithease.com
                <br />
                bookings@staywithease.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Hours</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                24/7 Reception
                <br />
                Concierge: 6AM - 10PM
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Call Us
          </Button>
        </div>
      </div>
    </section>
  )
}
