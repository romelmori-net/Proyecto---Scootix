import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { name, review, rating } = await req.json();

        if (!name || !review || !rating) {
            return NextResponse.json(
                { message: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        const testimonial = await prisma.testimonial.create({
            data: {
                name,
                review,
                rating: Number(rating),
                approved: false, // Por defecto no aprobado
            },
        });

        return NextResponse.json(
            { message: "Testimonio recibido", testimonial },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error al crear testimonio:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { approved: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json(
            { message: "Error al obtener testimonios" },
            { status: 500 }
        );
    }
}
