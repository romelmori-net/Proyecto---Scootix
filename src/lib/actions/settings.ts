"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const DEFAULT_SETTINGS = {
    businessName: "Scootix",
    email: "info@scootix.com",
    phone: "972 137 565",
    whatsapp: "51972137565",
    address: "Av. La Marina 1234, Lima, Perú",
    hours: "Lun–Sáb: 9am – 7pm",
    whatsappMessage: "Hola! Me comunico desde Scootix 👋",
};

export async function getSiteSettings() {
    try {
        const settings = await prisma.siteSettings.upsert({
            where: { id: "1" },
            create: { id: "1", ...DEFAULT_SETTINGS },
            update: { ...DEFAULT_SETTINGS },
        });
        return settings;
    } catch (error) {
        console.error("Error getting site settings:", error);
        return { id: "1", ...DEFAULT_SETTINGS, updatedAt: new Date() };
    }
}

export async function updateSiteSettings(data: {
    businessName?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    hours?: string;
    whatsappMessage?: string;
}) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return { success: false, error: "No autorizado" };
    }

    try {
        await prisma.siteSettings.upsert({
            where: { id: "1" },
            create: { id: "1", ...DEFAULT_SETTINGS, ...data },
            update: data,
        });

        revalidatePath("/admin/ajustes");
        revalidatePath("/contact");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error updating site settings:", error);
        return { success: false, error: "No se pudo guardar la configuración" };
    }
}
