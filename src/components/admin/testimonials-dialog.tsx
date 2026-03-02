"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, Save, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface Testimonial {
    id?: string;
    name: string;
    review: string;
    rating: number;
    approved?: boolean;
}

interface TestimonialsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    testimonial?: Testimonial | null;
    onSuccess: () => void;
}

export function TestimonialsDialog({
    open,
    onOpenChange,
    testimonial,
    onSuccess,
}: TestimonialsDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Testimonial>({
        name: "",
        review: "",
        rating: 5,
        approved: false,
    });

    useEffect(() => {
        if (testimonial) {
            setFormData(testimonial);
        } else {
            setFormData({
                name: "",
                review: "",
                rating: 5,
                approved: false,
            });
        }
    }, [testimonial, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = testimonial?.id
                ? `/api/admin/testimonials/${testimonial.id}`
                : '/api/admin/testimonials';

            const method = testimonial?.id ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error();

            onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving testimonial:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-[#111a2d] border-[#2a3f5f] text-white rounded-[2rem] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black tracking-tight">
                        {testimonial ? "Editar Testimonio" : "Nuevo Testimonio"}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 font-medium">
                        Completa los campos para {testimonial ? "actualizar" : "crear"} la opinión del cliente.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre del Cliente</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-[#0d1320] border-[#2a3f5f] rounded-xl h-12 text-sm font-bold focus:ring-[#1a6aff]/20"
                                placeholder="Ej: Roberto Sánchez"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Calificación (1-5)</Label>
                            <div className="flex gap-2 p-2 bg-[#0d1320] rounded-xl border border-[#2a3f5f]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={cn(
                                                "h-6 w-6 transition-all",
                                                star <= formData.rating
                                                    ? "fill-[#ffb800] text-[#ffb800]"
                                                    : "text-slate-700"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Reseña / Comentario</Label>
                            <Textarea
                                value={formData.review}
                                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                className="bg-[#0d1320] border-[#2a3f5f] rounded-xl min-h-[120px] text-sm font-medium focus:ring-[#1a6aff]/20 resize-none leading-relaxed"
                                placeholder="Escribe el testimonio aquí..."
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-[#1a6aff]/5 rounded-2xl border border-[#1a6aff]/10">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className={cn("h-5 w-5", formData.approved ? "text-[#1df542]" : "text-slate-600")} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-tight text-white">Aprobado para Publicar</p>
                                    <p className="text-[8px] text-slate-500 font-medium">Si está activo, se mostrará en la Home.</p>
                                </div>
                            </div>
                            <Switch
                                checked={formData.approved}
                                onCheckedChange={(checked) => setFormData({ ...formData, approved: checked })}
                                className="data-[state=checked]:bg-[#1df542]"
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t border-[#2a3f5f]/30">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-[#1a6aff] hover:bg-[#1a6aff]/80 text-white rounded-xl font-black px-8 uppercase tracking-widest text-[10px] h-12 shadow-xl shadow-blue-500/10"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            {testimonial ? "Actualizar" : "Guardar Testimonio"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
