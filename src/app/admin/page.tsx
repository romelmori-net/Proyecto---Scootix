import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const userCount = await prisma.user.count();

    // En un caso real, sumaríamos los totales de las órdenes
    const totalRevenue = 0;

    const stats = [
        { name: "Ventas Totales", value: `$${totalRevenue}`, icon: DollarSign, color: "text-green-600" },
        { name: "Pedidos", value: orderCount, icon: ShoppingCart, color: "text-blue-600" },
        { name: "Productos", value: productCount, icon: Package, color: "text-orange-600" },
        { name: "Clientes", value: userCount, icon: Users, color: "text-purple-600" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Bienvenido al panel de control de Scootix.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.name}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
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
