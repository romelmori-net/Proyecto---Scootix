"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Trash2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 leading-tight">Gestión de <span className="text-primary">Testimonios</span></h1>
                    <p className="text-slate-600 font-medium">Modera las reseñas que aparecen en la página principal.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {testimonials.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-bold">No hay testimonios para mostrar.</p>
                    </div>
                ) : (
                    testimonials.map((t) => (
                        <Card key={t.id} className={cn("border-none shadow-sm rounded-[2rem] overflow-hidden transition-all", t.approved ? "bg-white" : "bg-slate-50 opacity-80")}>
                            <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge variant={t.approved ? "default" : "outline"} className={cn("rounded-full px-4 py-1", t.approved ? "bg-green-500" : "bg-amber-100 text-amber-700")}>
                                            {t.approved ? <Check className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                            {t.approved ? "Visible" : "Pendiente"}
                                        </Badge>
                                        <span className="text-sm text-slate-400 font-medium">{new Date(t.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <h3 className="text-xl font-black text-slate-900">{t.name}</h3>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={cn("h-4 w-4 fill-primary text-primary", i >= t.rating && "fill-slate-200 text-slate-200")} />
                                        ))}
                                    </div>
                                    <blockquote className="text-lg text-slate-700 font-medium italic">"{t.review}"</blockquote>
                                </div>

                                <div className="flex md:flex-col gap-3">
                                    <Button
                                        onClick={() => toggleApproval(t.id, t.approved)}
                                        variant={t.approved ? "outline" : "default"}
                                        className="rounded-xl h-12 px-6 font-bold"
                                    >
                                        {t.approved ? "Ocultar" : "Aprobar"}
                                    </Button>
                                    <Button
                                        onClick={() => deleteTestimonial(t.id)}
                                        variant="destructive"
                                        size="icon"
                                        className="rounded-xl h-12 w-12"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
