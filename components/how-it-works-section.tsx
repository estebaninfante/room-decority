import { Upload, Wand2, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Your Photo",
    description: "Take a photo of any room or upload an existing image from your device.",
  },
  {
    icon: Wand2,
    title: "Choose a Style",
    description: "Select from dozens of professional design styles or let AI suggest the perfect match.",
  },
  {
    icon: Download,
    title: "Get Your Design",
    description: "Download your transformed space in seconds and bring your vision to life.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            How It Works
          </h2>
          <p className="mb-16 text-pretty text-lg leading-relaxed text-muted-foreground">
            Transform any space in three simple steps. No design skills required.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>

                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>

                <p className="text-pretty leading-relaxed text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
