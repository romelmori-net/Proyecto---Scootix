"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createBooking(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Date;
  time: string;
}) {
  try {
    const session = await getServerSession(authOptions);

    const booking = await prisma.booking.create({
      data: {
        ...data,
        userId: (session?.user as any)?.id || null,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/bookings");
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: "No se pudo crear la reserva" };
  }
}

export async function getBookings() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      throw new Error("No autorizado");
    }

    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      throw new Error("No autorizado");
    }

    await prisma.booking.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false };
  }
}

export async function deleteBooking(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      throw new Error("No autorizado");
    }

    await prisma.booking.delete({
      where: { id },
    });

    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return { success: false };
  }
}
