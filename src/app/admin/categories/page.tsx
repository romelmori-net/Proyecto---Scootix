"use client";

import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "@/lib/actions/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, ListChecks, Zap, ChevronRight, Tag } from "lucide-react";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const { toast } = useToast();

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
        setFetching(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setLoading(true);
        const result = await createCategory(newCategory.trim());

        if (result.success) {
            setNewCategory("");
            fetchCategories();
            toast({
                title: "Éxito",
                description: "Categoría creada correctamente",
                className: "bg-[#1df542] text-white font-bold border-none"
            });
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;

        const result = await deleteCategory(id);
        if (result.success) {
            fetchCategories();
            toast({
                title: "Eliminada",
                description: "La categoría se ha eliminado.",
                className: "bg-[#ff3b5c] text-white font-bold border-none"
            });
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Área - Navy Dark */}
            <div className="relative p-4 rounded-3xl bg-[#1E293B]/40 border border-white/5 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[8px] font-black uppercase tracking-widest">
                            <Zap className="h-2.5 w-2.5 fill-current" />
                            Arquitectura de Datos
                        </div>
                        <h1 className="text-xl font-extrabold text-[#F1F5F9] tracking-tighter">
                            Gestión de <span className="text-[#2563EB] italic">Categorías</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Compact Form Card */}
                <Card className="md:col-span-1 bg-[#1E293B] border border-white/5 rounded-3xl shadow-xl relative overflow-hidden group">
                    {/* Brand Signature Line Decor */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#2563EB] via-[#22C55E] to-[#2563EB] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="p-6 pb-2">
                        <CardTitle className="text-lg font-black text-[#F1F5F9] tracking-tight">Nueva Categoría</CardTitle>
                        <CardDescription className="text-slate-500 text-[11px] font-medium leading-tight">Define una nueva rama de clasificación.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Comercial</label>
                                <input
                                    placeholder="Ej: Accesorios Premium..."
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full bg-[#111827] border border-white/5 rounded-xl py-2.5 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/40 transition-all text-sm font-medium"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] transition-all border-none rounded-xl h-11 font-black uppercase text-[10px] tracking-widest text-white shadow-xl shadow-[#2563EB]/20"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2 shadow-2xl" />}
                                Crear Categoría
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Compact List Card */}
                <Card className="md:col-span-2 bg-[#1E293B]/40 border border-white/5 rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm">
                    <CardHeader className="p-5 border-b border-white/5 bg-[#111827]/50 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-black text-[#F1F5F9] tracking-tight flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20 shadow-[0_0_15px_rgba(37,99,235,0.05)]">
                                <ListChecks className="h-4 w-4" />
                            </div>
                            Jerarquía Actual
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                        {fetching ? (
                            <div className="flex justify-center p-8">
                                <Loader2 className="animate-spin h-8 w-8 text-[#2563EB]" />
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="text-center py-12 bg-[#111827]/30 rounded-2xl border border-dashed border-white/5 flex flex-col items-center gap-3">
                                <Tag className="h-10 w-10 text-slate-600" />
                                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Sin categorías todavía</p>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-3.5 bg-[#111827] border border-white/5 rounded-xl hover:bg-[#1E293B] hover:border-[#2563EB]/30 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                                            <span className="font-bold text-[#F1F5F9] text-base tracking-tight group-hover:text-[#2563EB] transition-colors">{category.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="hidden sm:flex flex-col text-right mr-3 text-slate-500">
                                                <span className="text-[7px] font-black uppercase tracking-widest">Estado</span>
                                                <span className="text-[9px] font-bold text-[#22C55E]">ACTIVO</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(category.id)}
                                                className="h-9 w-9 rounded-lg bg-[#EF4444]/5 text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all shadow-inner border border-[#EF4444]/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <div className="p-1 h-8 w-8 flex items-center justify-center opacity-10 group-hover:opacity-100 group-hover:text-[#2563EB] transition-all">
                                                <ChevronRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
