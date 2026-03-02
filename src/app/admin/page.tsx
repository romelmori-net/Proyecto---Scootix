import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign, Star, Mail, Zap, TrendingUp, AlertTriangle } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        { name: "Ventas Totales", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "from-[#1df542] to-[#1a6aff]", glow: "shadow-[#1df542]/10" },
        { name: "Pedidos", value: orderCount, icon: ShoppingCart, color: "from-[#1a6aff] to-[#1df542]", glow: "shadow-[#1a6aff]/10" },
        { name: "Productos", value: productCount, icon: Package, color: "from-blue-500 to-indigo-600", glow: "shadow-blue-500/10", href: "/admin/products" },
        { name: "Clientes", value: userCount, icon: Users, color: "from-purple-500 to-pink-600", glow: "shadow-purple-500/10", href: "/admin/users" },
        { name: "Mensajes", value: messageCount, icon: Mail, color: "from-cyan-500 to-blue-600", glow: "shadow-cyan-500/10", href: "/admin/messages" },
        { name: "Testimonios", value: "Gestionar", icon: Star, color: "from-amber-400 to-orange-500", glow: "shadow-orange-500/10", href: "/admin/testimonials" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-h-full">
            {/* Header Área Compacto y Vibrante */}
            <div className="relative p-6 rounded-[2rem] bg-[#1E293B]/40 border border-white/10 overflow-hidden shadow-xl group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#2563EB]/10 to-[#22C55E]/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#22C55E] text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                            <Zap className="h-3 w-3 fill-current" />
                            Panel Maestro
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tighter">
                            Dash<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#22C55E] italic">board</span>
                        </h1>
                        <p className="text-slate-400 text-xs font-medium max-w-xl">
                            Estado actual de <span className="text-white font-bold">Scootix</span>. Gestión tecnológica y movilidad eléctrica.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid de Estadísticas - Ultra Compacto */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {stats.map((stat) => (
                    <Link key={stat.name} href={(stat as any).href || "#"} className="group">
                        <Card className={cn(
                            "relative overflow-hidden border-white/5 bg-[#1E293B] hover:bg-[#1E293B]/80 transition-all duration-300 hover:border-[#2563EB]/50 h-full rounded-2xl backdrop-blur-sm",
                            stat.glow
                        )}>
                            <div className={cn("absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r", stat.color)} />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                                <CardTitle className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                    {stat.name}
                                </CardTitle>
                                <stat.icon className="h-3.5 w-3.5 text-white/40 group-hover:text-[#2563EB] transition-colors" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="text-xl font-black text-[#F1F5F9] tracking-tight italic">
                                    {stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Secciones de Información Dinámica - Altura Controlada */}
            <div className="grid gap-6 lg:grid-cols-7">
                <Card className="lg:col-span-4 bg-[#1E293B]/50 border-white/5 hover:border-white/10 rounded-[2rem] overflow-hidden shadow-lg group backdrop-blur-sm">
                    <CardHeader className="p-5 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-4 w-4 text-[#2563EB]" />
                            <CardTitle className="text-base font-black text-[#F1F5F9] tracking-tight">Ventas Recientes</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 flex flex-col items-center justify-center min-h-[150px]">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] italic">No hay actividad reciente</p>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 bg-[#1E293B]/50 border-white/5 hover:border-white/10 rounded-[2rem] overflow-hidden shadow-lg group backdrop-blur-sm">
                    <CardHeader className="p-5 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-4 w-4 text-[#FACC15]" />
                            <CardTitle className="text-base font-black text-[#F1F5F9] tracking-tight">Estado de Stock</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 flex flex-col items-center justify-center min-h-[150px]">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] italic text-center">
                            Todo el inventario está en<br />
                            <span className="text-[#22C55E]">NIVEL ÓPTIMO</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
