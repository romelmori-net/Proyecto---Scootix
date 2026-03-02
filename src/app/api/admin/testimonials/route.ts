import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const { name, review, rating, image, approved } = await req.json();
        const testimonial = await prisma.testimonial.create({
            data: {
                name,
                review,
                rating: Number(rating) || 5,
                image,
                approved: approved ?? false
            }
        });
        return NextResponse.json(testimonial);
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
