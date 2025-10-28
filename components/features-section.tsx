import { Zap, Palette, Shield, Clock, Users, Sparkles } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get professional designs in seconds, not days. Our AI processes images instantly.",
  },
  {
    icon: Palette,
    title: "50+ Design Styles",
    description: "From modern minimalist to classic luxury, explore dozens of professional styles.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your photos are processed securely and never shared. Complete privacy guaranteed.",
  },
  {
    icon: Clock,
    title: "Unlimited Revisions",
    description: "Try as many styles as you want. Experiment freely until you find the perfect look.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share designs with clients, contractors, or family members for instant feedback.",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description: "Get intelligent style recommendations based on your room type and preferences.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Powerful Features
          </h2>
          <p className="mb-16 text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything you need to transform your space with confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>

              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
