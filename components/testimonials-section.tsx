import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "I was skeptical at first, but Room Decority completely transformed how I visualize my home renovation. The results are stunning and helped me communicate my vision to contractors.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Interior Designer",
    content:
      "As a professional designer, this tool has become essential for client presentations. It saves me hours of work and helps clients see possibilities they never imagined.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Real Estate Agent",
    content:
      "Game changer for staging properties! I can show potential buyers what a space could look like with different styles. My listings sell faster now.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Loved by Thousands
          </h2>
          <p className="mb-16 text-pretty text-lg leading-relaxed text-muted-foreground">
            Join homeowners, designers, and real estate professionals who trust Room Decority.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="mb-6 leading-relaxed text-foreground">{testimonial.content}</p>

              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
