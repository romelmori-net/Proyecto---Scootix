"use client";

import { useEffect, useState } from "react";
import { getBookings, updateBookingStatus, deleteBooking } from "@/lib/actions/bookings";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    CalendarDays,
    Clock,
    User,
    Phone,
    Trash2,
    Search,
    Filter,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Zap,
    ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        const data = await getBookings();
        setBookings(data || []);
        setLoading(false);
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        const result = await updateBookingStatus(id, status);
        if (result.success) {
            toast({
                title: "Estado actualizado",
                description: `La reserva ahora está ${status}`,
                className: "bg-[#1a6aff] text-white font-bold border-none"
            });
            fetchBookings();
        } else {
            toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
            const result = await deleteBooking(id);
            if (result.success) {
                toast({ title: "Reserva eliminada", description: "La cita ha sido borrada del sistema." });
                fetchBookings();
            }
        }
    };

    const filteredBookings = bookings.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "PENDING":
                return { label: "Pendiente", className: "bg-[#ffb800]/10 text-[#ffb800] border-[#ffb800]/20", icon: Clock };
            case "CONFIRMED":
                return { label: "Confirmada", className: "bg-[#1df542]/10 text-[#1df542] border-[#1df542]/20", icon: ShieldCheck };
            case "CANCELLED":
                return { label: "Cancelada", className: "bg-[#ff3b5c]/10 text-[#ff3b5c] border-[#ff3b5c]/20", icon: XCircle };
            case "COMPLETED":
                return { label: "Finalizada", className: "bg-[#1a6aff]/10 text-[#1a6aff] border-[#1a6aff]/20", icon: CheckCircle2 };
            default:
                return { label: status, className: "bg-slate-500/10 text-slate-500 border-slate-500/20", icon: Clock };
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Área - Navy Dark */}
            <div className="relative p-4 rounded-3xl bg-[#1E293B]/40 border border-white/5 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[8px] font-black uppercase tracking-widest">
                            <Zap className="h-2.5 w-2.5 fill-current" />
                            Gestión Operativa
                        </div>
                        <h1 className="text-xl font-extrabold text-[#F1F5F9] tracking-tighter">
                            Reservas <span className="text-[#2563EB] italic">Activas</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#111827] px-4 py-2 rounded-2xl border border-white/5 text-center min-w-[90px] shadow-inner">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Total</p>
                            <p className="text-xl font-black text-[#F1F5F9] leading-none">{bookings.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Control Bar - Navy Dark */}
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-[#2563EB] transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar cliente o servicio..."
                        className="w-full bg-[#1E293B]/60 border border-white/5 rounded-2xl py-2.5 pl-12 pr-6 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/40 transition-all shadow-lg backdrop-blur-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button className="bg-[#1E293B] hover:bg-[#1E293B]/80 text-[#F1F5F9] border border-white/5 rounded-2xl px-6 h-11 font-black uppercase text-[10px] tracking-widest transition-all group shadow-sm shrink-0">
                    <Filter className="h-4 w-4 mr-2 text-[#2563EB] transition-colors" />
                    Filtrar
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-48 bg-[#111827] rounded-3xl border border-white/5 animate-pulse" />
                    ))}
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-[#1E293B]/20 rounded-[2.5rem] border border-dashed border-white/10">
                    <CalendarDays className="h-12 w-12 text-slate-600 mb-4" />
                    <h3 className="text-lg font-black text-slate-500 tracking-tight uppercase tracking-widest text-[10px]">Sin resultados encontrados</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredBookings.map((booking) => {
                        const status = getStatusConfig(booking.status);
                        return (
                            <div
                                key={booking.id}
                                className="group relative bg-[#1E293B]/40 border border-white/5 rounded-3xl p-5 hover:border-[#2563EB]/30 transition-all duration-500 shadow-xl overflow-hidden flex flex-col justify-between backdrop-blur-sm"
                            >
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#2563EB] via-[#22C55E] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="space-y-0.5">
                                            <p className="text-[7px] font-black text-[#2563EB] uppercase tracking-[0.2em] italic">{booking.service}</p>
                                            <h3 className="text-base font-black text-[#F1F5F9] tracking-tighter truncate max-w-[120px]">
                                                {booking.name}
                                            </h3>
                                        </div>
                                        <Badge className={cn("rounded-lg px-2 py-0.5 border font-black text-[7px] uppercase tracking-widest", status.className)}>
                                            {status.label}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3 mb-6 pb-4 border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-xl bg-[#111827] flex items-center justify-center border border-white/5">
                                                <CalendarDays className="h-3.5 w-3.5 text-[#2563EB]" />
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Fecha</p>
                                                <p className="text-[#F1F5F9] text-[11px] font-bold">{format(new Date(booking.date), "dd/MM/yyyy")}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-xl bg-[#111827] flex items-center justify-center border border-white/5">
                                                <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Hora</p>
                                                <p className="text-[#F1F5F9] text-[11px] font-bold">{booking.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-none rounded-xl h-10 font-black uppercase text-[8px] tracking-widest transition-all">
                                                Gestionar
                                                <ChevronRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 bg-[#111827] border-white/10 text-[#F1F5F9] rounded-xl p-1.5 shadow-2xl backdrop-blur-xl">
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, "CONFIRMED")} className="rounded-lg py-2 hover:bg-[#22C55E]/10 hover:text-[#22C55E] cursor-pointer font-bold transition-colors uppercase text-[8px] tracking-widest">
                                                Confirmar <ShieldCheck className="ml-auto h-3 w-3" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, "COMPLETED")} className="rounded-lg py-2 hover:bg-[#2563EB]/10 hover:text-[#2563EB] cursor-pointer font-bold transition-colors uppercase text-[8px] tracking-widest">
                                                Finalizar <CheckCircle2 className="ml-auto h-3 w-3" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, "CANCELLED")} className="rounded-lg py-2 hover:bg-[#EF4444]/10 hover:text-[#EF4444] cursor-pointer font-bold transition-colors uppercase text-[8px] tracking-widest">
                                                Cancelar <XCircle className="ml-auto h-3 w-3" />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(booking.id)}
                                        className="h-10 w-10 rounded-xl bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all border border-[#EF4444]/10"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
