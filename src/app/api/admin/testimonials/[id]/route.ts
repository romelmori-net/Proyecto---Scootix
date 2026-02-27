import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { approved } = await req.json();
        const testimonial = await prisma.testimonial.update({
            where: { id: params.id },
            data: { approved }
        });
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.testimonial.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ message: "Eliminado" });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
