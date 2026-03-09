import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary (Reemplazar con tus credenciales o usar variables de entorno)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No se ha seleccionado ningún archivo" },
                { status: 400 }
            );
        }

        // Convertir el archivo a Buffer para Cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Subir a Cloudinary usando una promesa para manejar el callback
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "scootix_products",
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        }) as any;

        // Devolver la URL pública de la imagen en la nube
        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url
        });

    } catch (error: any) {
        console.error("Error en la subida de imagen a Cloudinary:", error);
        return NextResponse.json(
            { error: "Error interno al subir la imagen a la nube", details: error.message },
            { status: 500 }
        );
    }
}
