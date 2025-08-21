import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Clock, Heart } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "24/7 security and contactless check-in for your peace of mind.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Luxury amenities and five-star service in every accommodation.",
  },
  {
    icon: Clock,
    title: "Flexible Booking",
    description: "Easy online booking with flexible cancellation policies.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "Dedicated concierge service to make your stay memorable.",
  },
]

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Why Choose Stay With Ease?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At Stay With Ease, we believe luxury should be accessible. Our carefully designed accommodations offer
              the perfect blend of comfort, elegance, and value, ensuring every guest experiences the finest
              hospitality.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-none bg-accent/50">
                  <CardContent className="p-6">
                    <feature.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-serif font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14e26259-4946-4e21-a670-c261f8787936-sHISRPCjXoYLNNjPWdpCkA8mjCog2y.jpeg"
              alt="Luxury hotel exterior"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
