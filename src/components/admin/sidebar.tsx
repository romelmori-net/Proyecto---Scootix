"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Productos", href: "/admin/products", icon: Package },
    { name: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
    { name: "Usuarios", href: "/admin/users", icon: Users },
    { name: "Ajustes", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col sticky top-0 h-screen shadow-xl border-r border-slate-800">
            <div className="p-6 border-b border-slate-800 bg-[#1e293b]/50">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-primary transition-colors">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <ChevronLeft className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="tracking-tight">Scootix <span className="text-primary font-black">PRO</span></span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1.5 mt-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Principal</div>
                {menuItems.slice(0, 3).map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_-5px_rgba(var(--primary),0.4)]"
                                    : "hover:bg-slate-800/50 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mt-8 mb-2">Sistema</div>
                {menuItems.slice(3).map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "hover:bg-slate-800/50 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "scale-110" : "group-hover:scale-110")} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 bg-[#1e293b]/30">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all rounded-lg"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Salir del Panel</span>
                </Button>
            </div>
        </aside>
    );
}
