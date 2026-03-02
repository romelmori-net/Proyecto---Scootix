"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    Mail,
    ListChecks,
    CalendarDays,
    Sparkles,
    LogOut,
    User as UserIcon,
    ChevronUp
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Productos", href: "/admin/products", icon: Package },
    { name: "Categorías", href: "/admin/categories", icon: ListChecks },
    { name: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
    { name: "Reservas", href: "/admin/bookings", icon: CalendarDays },
    { name: "Mensajes", href: "/admin/messages", icon: Mail },
    { name: "Usuarios", href: "/admin/users", icon: Users },
    { name: "Ajustes", href: "/admin/ajustes", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <aside className="w-72 bg-[#111827] border-r border-white/5 flex flex-col h-screen shrink-0 relative overflow-hidden">
            {/* Glow background estratégico */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/10 blur-[100px] rounded-full -mr-24 -mt-24 pointer-events-none" />

            {/* Scrollable Navigation - Balanceado y Elegante */}
            <nav className="flex-1 overflow-y-auto p-5 scrollbar-hide space-y-8 pt-16">
                {/* General Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] px-4 mb-5">
                        <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
                        Principal
                    </div>
                    <div className="space-y-1.5">
                        {menuItems.slice(0, 3).map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                        isActive
                                            ? "bg-[#2563EB]/15 text-white border-l-[4px] border-[#2563EB] shadow-[0_0_25px_rgba(37,99,235,0.15)]"
                                            : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-[18px] w-[18px] transition-all duration-500",
                                        isActive ? "text-[#2563EB] drop-shadow-[0_0_12px_rgba(37,99,235,0.8)] scale-110" : "group-hover:text-[#2563EB] group-hover:scale-110"
                                    )} />
                                    <span className={cn(
                                        "text-[13px] font-bold tracking-tight transition-colors",
                                        isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                    )}>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Operations Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] px-4 mb-5">
                        Sistema & Operativa
                    </div>
                    <div className="space-y-1.5">
                        {menuItems.slice(3).map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                        isActive
                                            ? "bg-[#2563EB]/15 text-white border-l-[4px] border-[#2563EB] shadow-[0_0_25px_rgba(37,99,235,0.15)]"
                                            : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-[18px] w-[18px] transition-all duration-500",
                                        isActive ? "text-[#2563EB] drop-shadow-[0_0_12px_rgba(37,99,235,0.8)] scale-110" : "group-hover:text-[#2563EB] group-hover:scale-110"
                                    )} />
                                    <span className={cn(
                                        "text-[13px] font-bold tracking-tight transition-colors",
                                        isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                    )}>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Profile Section - Profesional & Compacta */}
            <div className="p-4 border-t border-white/5 bg-[#0F172A]/50 backdrop-blur-md">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[0.03] transition-all group border border-transparent hover:border-white/5">
                            <Avatar className="h-10 w-10 border-2 border-[#2563EB]/20 rounded-xl group-hover:border-[#2563EB]/50 transition-all">
                                <AvatarImage src={session?.user?.image || ""} />
                                <AvatarFallback className="bg-[#1E293B] text-[#2563EB] font-black text-xs rounded-lg">
                                    {session?.user?.name?.[0] || session?.user?.email?.[0] || "A"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left min-w-0">
                                <p className="text-xs font-black text-[#F1F5F9] truncate tracking-tight">
                                    {session?.user?.name || "Administrador"}
                                </p>
                                <p className="text-[9px] font-bold text-slate-500 truncate uppercase mt-0.5 tracking-wider">
                                    Nivel Maestro
                                </p>
                            </div>
                            <ChevronUp className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 mb-2 rounded-2xl shadow-2xl border-white/10 bg-[#111827] text-white p-2 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="px-3 py-3 mb-2 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sesión Activa</p>
                            <p className="text-[11px] font-bold truncate text-[#F1F5F9]">{session?.user?.email}</p>
                        </div>
                        <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5 px-3 flex items-center gap-3 hover:bg-white/5 transition-colors">
                            <Link href="/profile" className="flex items-center gap-3 w-full font-bold text-xs text-slate-300 hover:text-white">
                                <UserIcon className="h-4 w-4 text-[#2563EB]" />
                                Mi Perfil
                            </Link>
                        </DropdownMenuItem>
                        <div className="h-px bg-white/5 my-2 mx-1" />
                        <DropdownMenuItem
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="rounded-xl cursor-pointer py-2.5 px-3 flex items-center gap-3 hover:bg-[#EF4444]/10 transition-colors text-[#EF4444]"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="font-black uppercase text-[10px] tracking-widest">Cerrar Sistema</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
}
