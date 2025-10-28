"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Sparkles, Download, RefreshCw, Loader2, X, Plus } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"



const DESIGN_STYLES = [
  { value: "modern", label: "Modern Minimalist" },
  { value: "scandinavian", label: "Scandinavian" },
  { value: "industrial", label: "Industrial" },
  { value: "bohemian", label: "Bohemian" },
  { value: "traditional", label: "Traditional" },
  { value: "contemporary", label: "Contemporary" },
  { value: "midcentury", label: "Mid-Century Modern" },
  { value: "coastal", label: "Coastal" },
]

const ROOM_TYPES = [
  { value: "living-room", label: "Living Room" },
  { value: "dining-room", label: "Dining Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "balcony", label: "Balcony" },
  { value: "office", label: "Office"},
  { value: "garage", label: "Garage"},
]

export default function PlaygroundPage() {
  const [originalImages, setOriginalImages] = useState<string[]>([])
  const [redesignedImage, setRedesignedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>("modern")
  const [isProcessing, setIsProcessing] = useState(false)
  const [roomType, setRoomType] = useState<string>("living-room")
  const [negativePrompt, setNegativePrompt] = useState<string>("")
  const [prompt, setPrompt] = useState<string>("")

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (originalImages.length + files.length > 3) {
      toast.error("Puedes subir un máximo de 3 imágenes.");
      return;
    }

    // Procesa cada archivo
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`La imagen ${file.name} pesa más de 10MB.`);
        return; // Salta este archivo
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Añade la nueva imagen al array de imágenes
        setOriginalImages(prevImages => [...prevImages, result]);
      };
      reader.readAsDataURL(file);
    });

    // Limpia el input para poder subir el mismo archivo si se elimina
    event.target.value = "";
  };

  // Función para eliminar una imagen de la lista
  const removeImage = (indexToRemove: number) => {
    setOriginalImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
  
const handleRedesign = async () => {
    // --- CAMBIO AQUÍ ---
    if (originalImages.length === 0) {
      toast.error("Por favor sube al menos una imagen");
      return;
    }
    // -----------------

    setIsProcessing(true);
    setRedesignedImage(null);

    try {
      const response = await fetch('/api/redesign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // --- CAMBIO AQUÍ ---
          originalImages, // <- Envía el array de imágenes
          // -----------------
          selectedStyle,
          roomType,
          prompt,
          negativePrompt,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error en el servidor de IA');
      }

      const data = await response.json();
      setRedesignedImage(data.redesignedImageUrl);
      toast.success("Room redesigned successfully!");

    } catch (error: any) {
      console.error("Error in handleRedesign:", error);
      toast.error(error.message || "Ocurrió un error durante el rediseño.");
    } finally {
      setIsProcessing(false);
    }
  }

  const handleDownload = () => {
    if (!redesignedImage) {
      toast.error("No hay imagen para descargar");
      return;
    }

    // --- CÓDIGO MEJORADO PARA DESCARGAR LA IMAGEN BASE64 ---
    try {
      const link = document.createElement('a');
      link.href = redesignedImage; // redesignedImage es la URL de datos base64
      link.download = 'redesigned-room.png'; // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started");
    } catch (error) {
      console.error("Error al descargar:", error);
      toast.error("No se pudo descargar la imagen.");
    }
  }

  const handleReset = () => {
    setOriginalImages([])
    setRedesignedImage(null)
    setSelectedStyle("modern")
    toast.info("Playground reset")
  }
  return (
    <>
      <Navigation />
      <div className="bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-foreground">AI Design Playground</h1>
            <p className="text-lg text-muted-foreground">
              Upload a room photo and transform it with AI-powered interior design
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
            {/* Control Panel */}
            <Card className="h-fit p-6">
              <div className="space-y-6">
<div>
                  <Label className="mb-3 block text-base font-semibold">
                    Upload Room Photos (Max 3)
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Mapea las imágenes subidas como thumbnails */}
                    {originalImages.map((imageSrc, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={imageSrc}
                          alt={`Uploaded room ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    {/* Muestra el botón de "Añadir" si hay menos de 3 imágenes */}
                    {originalImages.length < 3 && (
                      <label
                        htmlFor="image-upload"
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <Plus className="h-6 w-6" />
                        <span className="text-xs">Add Photo</span>
                      </label>
                    )}
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple // <- Permite selección múltiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Supported: JPG, PNG (max 10MB)</p>
                </div>

                <div>
                  <Label htmlFor="style-select" className="mb-3 block text-base font-semibold">
                    Design Style
                  </Label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger id="style-select" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DESIGN_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="room-type-select" className="mb-3 block text-base font-semibold">
                    Room Type
                  </Label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger id="room-type-select" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROOM_TYPES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prompt-input" className="mb-3 block text-base font-semibold">
                    Add Elements
                  </Label>
                  <Input
                    id="prompt-input"
                    placeholder="e.g., a green sofa, a plant"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="negative-prompt-input" className="mb-3 block text-base font-semibold">
                    Avoid Elements
                  </Label>
                  <Textarea
                    id="negative-prompt-input"
                    placeholder="e.g., clutter, dark colors"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    className="h-24"
                  />
                </div>

                <div className="space-y-3 pt-4">
                <Button className="w-full" size="lg" onClick={handleRedesign} disabled={originalImages.length === 0 || isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Redesign Room
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={handleDownload}
                    disabled={!redesignedImage}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Result
                  </Button>

                  <Button variant="ghost" className="w-full" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </Card>

            {/* Preview Area */}
            <Card className="overflow-hidden">
              <Tabs defaultValue="split" className="w-full">
                <div className="border-b border-border px-6 pt-4">
                  <TabsList>
                    <TabsTrigger value="split">Split View</TabsTrigger>
                    <TabsTrigger value="before">Before</TabsTrigger>
                    <TabsTrigger value="after">After</TabsTrigger>
                  </TabsList>
                </div>

<TabsContent value="split" className="m-0 p-6">
                  {/* --- CAMBIO AQUÍ: ELIMINAMOS "md:grid-cols-2" --- */}
                  <div className="grid gap-4">
                    {/* --- CAMBIO AQUÍ: USAMOS LA PRIMERA IMAGEN DEL ARRAY --- */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Original</Label>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
                        {originalImages.length > 0 ? (
                          <img
                            src={originalImages[0]} // <- Muestra la primera imagen
                            alt="Original room"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <Upload className="mx-auto mb-2 h-12 w-12 opacity-50" />
                              <p className="text-sm">Upload an image to start</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ----------------------------------------------- */}

                    {/* --- CAMBIO AQUÍ: La vista "Split" ahora es vertical --- */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Redesigned</Label>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
                        {isProcessing ? (
                          <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                              <Loader2 className="mx-auto mb-2 h-12 w-12 animate-spin text-primary" />
                              <p className="text-sm text-muted-foreground">AI is redesigning your room...</p>
                            </div>
                          </div>
                        ) : redesignedImage ? (
                          <img
                            src={redesignedImage} // <- (ya no usa placeholder)
                            alt="Redesigned room"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <Sparkles className="mx-auto mb-2 h-12 w-12 opacity-50" />
                              <p className="text-sm">Click "Redesign Room" to see results</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ----------------------------------------------- */}
                  </div>
                </TabsContent>

                <TabsContent value="before" className="m-0 p-6">
                  {/* --- CAMBIO AQUÍ: VISTA "BEFORE" --- */}
                  <div className="mx-auto max-w-3xl">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
                      {originalImages.length > 0 ? (
                        <img
                          src={originalImages[0]} // <- Muestra la primera imagen
                          alt="Original room"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <Upload className="mx-auto mb-2 h-12 w-12 opacity-50" />
                            <p className="text-sm">Upload an image to start</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* (Opcional) Muestra las otras thumbnails si existen */}
                    {originalImages.length > 1 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {originalImages.slice(1).map((src, idx) => (
                           <img
                           key={idx}
                           src={src}
                           alt={`Reference ${idx + 1}`}
                           className="h-full w-full rounded-md object-cover"
                         />
                        ))}
                      </div>
                    )}
                  </div>
                  {/* ----------------------------------- */}
                </TabsContent>

                <TabsContent value="after" className="m-0 p-6">
                  {/* ... (Contenido de "After" sin cambios, ya muestra la imagen rediseñada) */}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
