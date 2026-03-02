"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Trash2, Clock, Edit3, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { TestimonialsDialog } from "@/components/admin/testimonials-dialog";

interface Testimonial {
    id: string;
    name: string;
    review: string;
    rating: number;
    approved: boolean;
    createdAt: string;
}

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const { toast } = useToast();

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/admin/testimonials');
            const data = await res.json();
            setTestimonials(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudieron cargar los testimonios",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approved: !currentStatus }),
            });

            if (!res.ok) throw new Error();

            toast({
                title: currentStatus ? "Testimonio Ocultado" : "Testimonio Aprobado",
                description: `El testimonio ahora ${currentStatus ? 'no se mostrará' : 'es visible'} en la Home.`,
            });
            fetchTestimonials();
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el estado",
                variant: "destructive",
            });
        }
    };

    const deleteTestimonial = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este testimonio?")) return;

        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast({
                title: "Eliminado",
                description: "El testimonio ha sido borrado permanentemente.",
            });
            fetchTestimonials();
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo eliminar el testimonio",
                variant: "destructive",
            });
        }
    };

    if (loading) return <div className="p-8">Cargando testimonios...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
            {/* Ultra-Compact Header Area - Luna y Acero */}
            <div className="relative p-4 rounded-3xl bg-[#111a2d] border border-[#2a3f5f] overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#1a6aff]/10 blur-[60px] rounded-full -mr-24 -mt-24 animate-pulse" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1a6aff]/10 border border-[#1a6aff]/20 text-[#1a6aff] text-[8px] font-black uppercase tracking-widest">
                            <Star className="h-2.5 w-2.5 fill-current" />
                            Feedback de Comunidad
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tighter">
                            Gestión de <span className="text-[#1a6aff] italic">Testimonios</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => {
                                setSelectedTestimonial(null);
                                setIsDialogOpen(true);
                            }}
                            className="bg-[#1a6aff] hover:bg-[#1a6aff]/80 text-white rounded-2xl font-black px-6 uppercase tracking-widest text-[10px] h-12 shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span className="hidden md:inline">Nuevo Testimonio</span>
                        </Button>
                        <div className="bg-[#0d1320] px-4 py-2 rounded-2xl border border-[#2a3f5f] text-center min-w-[90px] shadow-inner">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Total</p>
                            <p className="text-xl font-black text-white leading-none">{testimonials.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-[#111a2d]/50 rounded-[2.5rem] border border-dashed border-[#2a3f5f]">
                        <Star className="h-12 w-12 text-slate-800 mb-4" />
                        <h3 className="text-lg font-black text-slate-500 tracking-tight uppercase tracking-widest text-[10px]">Sin testimonios</h3>
                    </div>
                ) : (
                    testimonials.map((t) => (
                        <div
                            key={t.id}
                            className={cn(
                                "group relative bg-[#111a2d] border border-[#2a3f5f] rounded-3xl p-5 hover:border-[#1a6aff]/50 transition-all duration-500 shadow-xl overflow-hidden flex flex-col justify-between",
                                !t.approved && "opacity-60 grayscale-[0.5]"
                            )}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a6aff] via-[#1df542] to-[#1a6aff] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-0.5">
                                        <h3 className="text-sm font-black text-white tracking-tight group-hover:text-[#1a6aff] transition-colors">{t.name}</h3>
                                        <p className="text-[8px] text-slate-500 font-medium">{new Date(t.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <Badge className={cn(
                                        "rounded-md px-1.5 py-0 border font-black text-[7px] uppercase tracking-widest",
                                        t.approved ? "bg-[#1df542]/10 text-[#1df542] border-[#1df542]/20" : "bg-[#ffb800]/10 text-[#ffb800] border-[#ffb800]/20"
                                    )}>
                                        {t.approved ? "Visible" : "Pendiente"}
                                    </Badge>
                                </div>

                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={cn("h-3 w-3 fill-[#ffb800] text-[#ffb800]", i >= t.rating && "fill-slate-800 text-slate-800")} />
                                    ))}
                                </div>

                                <blockquote className="text-xs text-slate-300 font-medium italic mb-6 line-clamp-3 leading-relaxed">
                                    "{t.review}"
                                </blockquote>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-[#2a3f5f]/30">
                                <Button
                                    onClick={() => toggleApproval(t.id, t.approved)}
                                    className={cn(
                                        "flex-1 h-9 rounded-xl font-black uppercase text-[8px] tracking-widest transition-all",
                                        t.approved
                                            ? "bg-[#111a2d] border border-[#2a3f5f] text-slate-400 hover:bg-[#ffb800] hover:text-white hover:border-none"
                                            : "bg-[#1a6aff] text-white hover:bg-[#1a6aff]/80"
                                    )}
                                >
                                    {t.approved ? "Ocultar" : "Aprobar"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSelectedTestimonial(t);
                                        setIsDialogOpen(true);
                                    }}
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 transition-all border border-white/5"
                                >
                                    <Edit3 className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    onClick={() => deleteTestimonial(t.id)}
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 rounded-xl bg-[#ff3b5c]/5 text-[#ff3b5c] hover:bg-[#ff3b5c] hover:text-white transition-all border border-[#ff3b5c]/10"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <TestimonialsDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                testimonial={selectedTestimonial}
                onSuccess={() => {
                    fetchTestimonials();
                    toast({
                        title: selectedTestimonial ? "Actualizado" : "Creado",
                        description: `El testimonio ha sido ${selectedTestimonial ? 'actualizado' : 'guardado'} correctamente.`,
                    });
                }}
            />
        </div>
    );
}
