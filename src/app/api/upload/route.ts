import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

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

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generar nombre de archivo único para evitar colisiones
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;

        // Ruta absoluta para guardar el archivo
        const uploadDir = join(process.cwd(), "public", "uploads");
        const path = join(uploadDir, fileName);

        // Asegurarse de que el directorio existe
        try {
            await writeFile(path, buffer);
        } catch (e) {
            const { mkdir } = await import("fs/promises");
            await mkdir(uploadDir, { recursive: true });
            await writeFile(path, buffer);
        }

        // Devolver la ruta relativa pública
        return NextResponse.json({
            success: true,
            url: `/uploads/${fileName}`
        });

    } catch (error) {
        console.error("Error en la subida de imagen:", error);
        return NextResponse.json(
            { error: "Error interno al subir la imagen" },
            { status: 500 }
        );
    }
}
