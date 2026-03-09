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
        // Validar variables de entorno
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            console.error("Faltan credenciales de Cloudinary");
            return NextResponse.json(
                {
                    error: "Error de configuración",
                    message: "Faltan variables de entorno en el servidor (Cloudinary).",
                    missing: !cloudName ? "CLOUD_NAME" : !apiKey ? "API_KEY" : "API_SECRET"
                },
                { status: 500 }
            );
        }

        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No se ha seleccionado ningún archivo" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "scootix_products",
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        }) as any;

        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url
        });

    } catch (error: any) {
        console.error("Critical Upload Error:", error);
        return NextResponse.json(
            {
                error: "Error interno al subir la imagen a la nube",
                details: error.message,
                name: error.name
            },
            { status: 500 }
        );
    }
}
