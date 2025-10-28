import { NextResponse } from "next/server";

const MOCK_IMAGES: Record<string, string> = {
  // Combinaciones específicas
  "living-room_modern": "/modern-luxury-living-room-after-ai-redesign.jpg",
  "bedroom_modern": "/modern-minimalist-bedroom-after.jpg",
  "kitchen_scandinavian": "/scandinavian-kitchen-after.jpg",
  "bathroom_traditional": "/luxury-spa-bathroom-after.jpg",
  "living-room_industrial": "/industrial-loft-living-room-after.jpg",

  // Imagen por defecto si no hay match
  "default": "/modern-luxury-living-room-after-ai-redesign.jpg",
};

export async function POST(request: Request) {
  try {
    const { originalImages, selectedStyle, roomType } =
      await request.json();

    if (!originalImages || originalImages.length === 0) {
      return NextResponse.json({ error: "No se proporcionó ninguna imagen" }, { status: 400 });
    }

    // ⏱️ SIMULA EL TIEMPO DE PROCESAMIENTO de la IA (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const key = `${roomType}_${selectedStyle}`;
    const imageUrl = MOCK_IMAGES[key] || MOCK_IMAGES["default"];

    // Devuelve la URL de la imagen simulada. En un entorno real,
    // el modelo devolvería el base64 que el cliente usa como URL.
    return NextResponse.json({ redesignedImageUrl: imageUrl });
  } catch (error: any) {
    console.error("Error simulando la generación de imagen:", error);
    return NextResponse.json({ error: "Error en el servidor de simulación." }, { status: 500 });
  }
}
// --- FIN DE SIMULACIÓN DE AI ---
