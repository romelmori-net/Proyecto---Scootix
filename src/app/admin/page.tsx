import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign, Star, Mail } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const userCount = await prisma.user.count();
    const messageCount = await prisma.contactMessage.count();

    const orders = await prisma.order.findMany({
        select: { total: true }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    const stats = [
        { name: "Ventas Totales", value: `$${totalRevenue}`, icon: DollarSign, color: "text-green-600" },
        { name: "Pedidos", value: orderCount, icon: ShoppingCart, color: "text-blue-600" },
        { name: "Productos", value: productCount, icon: Package, color: "text-orange-600", href: "/admin/products" },
        { name: "Clientes", value: userCount, icon: Users, color: "text-purple-600", href: "/admin/users" },
        { name: "Mensajes", value: messageCount, icon: Mail, color: "text-blue-500", href: "/admin/messages" },
        { name: "Testimonios", value: "Gestionar", icon: Star, color: "text-amber-600", href: "/admin/testimonials" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Bienvenido al panel de control de Scootix.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Link key={stat.name} href={(stat as any).href || "#"}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                                <stat.icon className={cn("h-4 w-4", stat.color)} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Ventas Recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No hay pedidos recientes para mostrar.</p>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Stock Bajo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Todos los productos tienen stock suficiente.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Necesario ya que Lucide y Next.js a veces se pelean con los tipos dinámicos en Server Components
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
