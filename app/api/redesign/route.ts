import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Convierte base64 → File para enviar a OpenAI (solo si haces edición)
function base64ToFile(base64Data: string, filename: string): File {
  const match = base64Data.match(/^data:(image\/.+);base64,(.+)$/);
  if (!match) throw new Error("Formato base64 inválido");
  const mimeType = match[1];
  const buffer = Buffer.from(match[2], "base64");
  return new File([buffer], filename, { type: mimeType });
}

export async function POST(request: Request) {
  try {
    const { originalImages, selectedStyle, roomType, prompt, negativePrompt } =
      await request.json();

    if (!originalImages || originalImages.length === 0) {
      return NextResponse.json({ error: "No se proporcionó ninguna imagen" }, { status: 400 });
    }

    const fullPrompt = `
      Rediseña este ${roomType.replace("_", " ")} al estilo ${selectedStyle}.
      Incluye: ${prompt}.
      Evita: ${negativePrompt}.
      Devuelve solo una imagen final limpia, sin texto ni marcas de agua.
    `;

    // 👇 Usa el modelo gpt-image-1 para generar el rediseño
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: fullPrompt,
      size: "1024x1024",
    });

    // ✅ Extrae el base64 correctamente
    const base64 = result.data[0].b64_json;
    const imageUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ image: imageUrl });
  } catch (error: any) {
    console.error("Error generando imagen:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
