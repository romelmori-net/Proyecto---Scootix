"use client";

import { deleteContactMessage } from "@/lib/actions/contact";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    Mail,
    User,
    MessageSquare,
    Clock,
    Trash2,
    Send,
    ArrowUpRight,
    CheckCircle2
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MessagesTable({ messages }: { messages: any[] }) {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este mensaje?")) return;
        const result = await deleteContactMessage(id);
        if (result.success) {
            toast({ title: "Mensaje eliminado", description: "La consulta ha sido borrada correctamente." });
            router.refresh();
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        }
    };

    return (
        <div className="space-y-6">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-[#1E293B]/20 rounded-[3rem] border border-dashed border-white/10">
                    <Mail className="h-16 w-16 text-slate-600 mb-6" />
                    <h3 className="text-2xl font-black text-slate-500 tracking-tight uppercase tracking-widest text-xs">Bandeja de Entrada Vacía</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className="group relative bg-[#1E293B]/40 border border-white/5 rounded-2xl p-4 hover:border-[#2563EB]/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl backdrop-blur-sm"
                        >
                            {/* Brand Signature Line Decor */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#2563EB] via-[#22C55E] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-[#111827] flex items-center justify-center border border-white/5 shadow-[0_0_10px_rgba(37,99,235,0.05)] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all">
                                        <User className="h-5 w-5 text-[#2563EB]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="text-sm font-black text-[#F1F5F9] tracking-tight">{msg.name}</h3>
                                            <Badge className={cn(
                                                "rounded-md px-1.5 py-0 border font-black text-[7px] uppercase tracking-widest",
                                                msg.status === "PENDING" ? "bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20" : "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                                            )}>
                                                {msg.status === "PENDING" ? "Pendiente" : "Leído"}
                                            </Badge>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium">{msg.email}</p>
                                    </div>
                                </div>

                                <div className="flex-1 md:px-6">
                                    <p className="text-xs font-bold text-[#F1F5F9] mb-0.5 line-clamp-1 group-hover:text-[#2563EB] transition-colors">{msg.subject}</p>
                                    <p className="text-slate-500 text-[10px] font-medium line-clamp-1 italic opacity-60">"{msg.message}"</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden xl:block">
                                        <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Recibido</p>
                                        <p className="text-slate-500 font-bold text-[9px]">{new Date(msg.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-xl bg-[#111827] text-slate-500 hover:text-[#2563EB] hover:bg-[#2563EB]/10 border border-white/5 transition-all"
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Message Detail Dialog PRO */}
            <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
                <DialogContent className="max-w-2xl rounded-[3rem] border border-white/10 bg-[#111827] p-0 overflow-hidden shadow-2xl font-sans text-[#F1F5F9] backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/5 blur-[80px] rounded-full -mr-32 -mt-32" />

                    <DialogHeader className="p-10 relative border-b border-white/5">
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-3xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                                <MessageSquare className="h-8 w-8" />
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black text-[#F1F5F9] tracking-tighter">Detalle de <span className="text-[#2563EB] italic">Mensaje</span></DialogTitle>
                                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mt-1">ID: {selectedMessage?.id?.slice(0, 8)}</p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-10 space-y-8 relative">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-[2rem] bg-[#1E293B]/60 border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#2563EB]/60 mb-3">Remitente</p>
                                <p className="font-black text-[#F1F5F9] text-lg leading-tight">{selectedMessage?.name}</p>
                                <p className="text-sm text-slate-500 font-bold mt-1">{selectedMessage?.email}</p>
                            </div>
                            <div className="p-6 rounded-[2rem] bg-[#1E293B]/60 border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#2563EB]/60 mb-3">Fecha de Envío</p>
                                <p className="font-black text-[#F1F5F9] text-lg leading-tight">
                                    {selectedMessage && new Date(selectedMessage.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-slate-500 font-bold mt-1">
                                    {selectedMessage && new Date(selectedMessage.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-[#1E293B]/60 border border-white/5 space-y-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#22C55E] mb-3">Asunto del Mensaje</p>
                                <p className="text-xl font-black text-[#F1F5F9] tracking-tight leading-tight">{selectedMessage?.subject}</p>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Contenido Integral</p>
                                <p className="text-slate-400 leading-relaxed font-medium text-lg italic">
                                    "{selectedMessage?.message}"
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                variant="ghost"
                                className="flex-1 h-14 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 text-slate-500 hover:text-white hover:bg-white/5"
                                onClick={() => setSelectedMessage(null)}
                            >
                                Cerrar
                            </Button>
                            <Button className="flex-[2] h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-[#2563EB] text-white shadow-2xl shadow-[#2563EB]/20 hover:shadow-[#2563EB]/40 hover:scale-[1.02] transition-all border-none" asChild>
                                <a href={`mailto:${selectedMessage?.email}?subject=Re: ${selectedMessage?.subject}`}>
                                    Responder por Email <Send className="ml-3 h-4 w-4" />
                                </a>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => { handleDelete(selectedMessage.id); setSelectedMessage(null); }}
                                className="h-14 w-14 rounded-2xl bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all shadow-inner border border-[#EF4444]/10"
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
