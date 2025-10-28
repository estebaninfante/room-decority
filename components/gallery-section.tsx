const galleryItems = [
  {
    before: "/outdated-bedroom-before.jpg",
    after: "/modern-minimalist-bedroom-after.jpg",
    style: "Modern Minimalist",
  },
  {
    before: "/plain-kitchen-before.jpg",
    after: "/scandinavian-kitchen-after.jpg",
    style: "Scandinavian",
  },
  {
    before: "/empty-living-room-before.jpg",
    after: "/industrial-loft-living-room-after.jpg",
    style: "Industrial Loft",
  },
  {
    before: "/basic-bathroom-before.jpg",
    after: "/luxury-spa-bathroom-after.jpg",
    style: "Luxury Spa",
  },
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Transformation Gallery
          </h2>
          <p className="mb-16 text-pretty text-lg leading-relaxed text-muted-foreground">
            See the magic of AI-powered design. Real rooms, real transformations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {galleryItems.map((item, index) => (
            <div key={index} className="group rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-lg">
                  <img src={item.before || "/placeholder.svg"} alt="Before" className="h-full w-full object-cover" />
                  <div className="absolute bottom-2 left-2 rounded bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                    Before
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg">
                  <img src={item.after || "/placeholder.svg"} alt="After" className="h-full w-full object-cover" />
                  <div className="absolute bottom-2 left-2 rounded bg-accent/90 px-2 py-1 text-xs font-medium text-accent-foreground backdrop-blur-sm">
                    After
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.style}</span>
                <span className="text-xs text-muted-foreground">AI Generated</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
