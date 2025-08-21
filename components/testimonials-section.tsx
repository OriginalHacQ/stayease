import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Accra, Ghana",
    rating: 5,
    comment:
      "Absolutely stunning! The attention to detail and luxury amenities exceeded all expectations. Will definitely return.",
  },
  {
    name: "Michael Asante",
    location: "Kumasi, Ghana",
    rating: 5,
    comment: "Perfect for our business trip. The executive suite was spacious and the service was impeccable.",
  },
  {
    name: "Emma Thompson",
    location: "London, UK",
    rating: 5,
    comment: "A hidden gem! The modern design and warm hospitality made our vacation unforgettable.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">What Our Guests Say</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it - hear from our satisfied guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
