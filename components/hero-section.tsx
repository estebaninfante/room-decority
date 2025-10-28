import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Interior Design</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            Transform Your Space with AI Magic
          </h1>

          <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Upload a photo of any room and watch as our AI instantly redesigns it with professional interior design
            styles. No design experience needed.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group" asChild>
              <Link href="/playground">
                Start Designing Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <img src="/modern-living-room-before.png" alt="Before transformation" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-lg bg-background/90 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              Before
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <img src="/modern-luxury-living-room-after-ai-redesign.jpg" alt="After transformation" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-lg bg-accent/90 px-3 py-1.5 text-sm font-medium text-accent-foreground backdrop-blur-sm">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
