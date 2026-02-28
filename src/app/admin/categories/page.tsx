"use client";

import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "@/lib/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, ListChecks } from "lucide-react";

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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
                <p className="text-muted-foreground">Gestiona las categorías para organizar tus productos.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1 shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-black">Nueva Categoría</CardTitle>
                        <CardDescription>Añade una opción de clasificación.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Ej: Accesorios"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="rounded-xl h-11"
                                />
                            </div>
                            <Button type="submit" className="w-full rounded-xl h-11 font-black" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                                Crear Categoría
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-black flex items-center gap-2">
                            <ListChecks className="h-5 w-5 text-primary" /> Lista de Categorías
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {fetching ? (
                            <div className="flex justify-center p-8">
                                <Loader2 className="animate-spin h-8 w-8 text-primary/40" />
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                No hay categorías creadas todavía.
                            </div>
                        ) : (
                            <div className="grid gap-2">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-primary/20 transition-all group"
                                    >
                                        <span className="font-bold text-slate-700">{category.name}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(category.id)}
                                            className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
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
