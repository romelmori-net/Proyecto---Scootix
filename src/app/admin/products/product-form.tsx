"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createProduct, updateProduct } from "@/lib/actions/products";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X, Upload, Image as ImageIcon, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductForm({
    product,
    categories
}: {
    product?: any,
    categories: any[]
}) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || "",
        stock: product?.stock || "10",
        categoryId: product?.categoryId || "",
        imageUrl: product?.imageUrl || "",
    });

    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(product?.imageUrl || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!selectedFile) return formData.imageUrl;

        const data = new FormData();
        data.append("file", selectedFile);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            if (result.success) {
                return result.url;
            }
            throw new Error(result.error);
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let finalImageUrl = formData.imageUrl;

        if (selectedFile) {
            setUploading(true);
            const uploadedUrl = await uploadImage();
            setUploading(false);

            if (!uploadedUrl) {
                toast({
                    title: "Error de subida",
                    description: "No se pudo subir la imagen. Inténtalo de nuevo.",
                    variant: "destructive",
                });
                setLoading(false);
                return;
            }
            finalImageUrl = uploadedUrl;
        }

        const productData = {
            ...formData,
            imageUrl: finalImageUrl
        };

        if (!formData.categoryId) {
            toast({
                title: "Categoría requerida",
                description: "Por favor, selecciona una categoría para el producto.",
                variant: "destructive",
            });
            setLoading(false);
            return;
        }

        const result = product
            ? await updateProduct(product.id, productData)
            : await createProduct(productData);

        if (result.success) {
            toast({
                title: product ? "Producto actualizado" : "Producto creado",
                description: `${formData.name} se ha guardado correctamente.`,
            });
            router.push("/admin/products");
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto pb-10">
            <form onSubmit={handleSubmit}>
                <Card className="bg-[#111a2d] border-[#2a3f5f]/50 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1a6aff]/5 to-[#1df542]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                    <CardHeader className="p-8 pb-4 relative">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-xl bg-[#1a6aff]/10 border border-[#1a6aff]/20 text-[#1a6aff]">
                                <Zap className="h-5 w-5 fill-current" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black text-white tracking-tight">
                                    {product ? "Editar" : "Nuevo"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a6aff] to-[#1df542] italic">Producto</span>
                                </CardTitle>
                                <CardDescription className="text-slate-500 font-medium">
                                    Define los atributos técnicos y comerciales de la unidad.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="px-8 pb-8 space-y-6 relative">
                        {/* Fila 1: Nombre */}
                        <div className="grid gap-2.5">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Nombre del Producto</Label>
                            <Input
                                id="name"
                                className="bg-[#0a0f1a]/50 border-[#2a3f5f]/50 focus:border-[#1a6aff]/50 focus:ring-[#1a6aff]/20 rounded-2xl h-12 text-white font-bold"
                                placeholder="Ej: Scooter Eléctrico Pro X1"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {/* Fila 2: Descripción */}
                        <div className="grid gap-2.5">
                            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Ficha Técnica / Descripción</Label>
                            <Textarea
                                id="description"
                                className="bg-[#0a0f1a]/50 border-[#2a3f5f]/50 focus:border-[#1a6aff]/50 focus:ring-[#1a6aff]/20 rounded-2xl min-h-[120px] text-white font-medium resize-none p-4"
                                placeholder="Describe el pulso tecnológico y las ventajas de este producto..."
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {/* Fila 3: Precio y Stock */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="grid gap-2.5">
                                <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Precio Unitario ($)</Label>
                                <div className="relative group">
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        className="bg-[#0a0f1a]/50 border-[#2a3f5f]/50 focus:border-[#1a6aff]/50 focus:ring-[#1a6aff]/20 rounded-2xl h-12 pl-10 text-white font-black"
                                        placeholder="0.00"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1df542] font-black">$</span>
                                </div>
                            </div>
                            <div className="grid gap-2.5">
                                <Label htmlFor="stock" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Disponibilidad (Stock)</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    className="bg-[#0a0f1a]/50 border-[#2a3f5f]/50 focus:border-[#1a6aff]/50 focus:ring-[#1a6aff]/20 rounded-2xl h-12 text-white font-black"
                                    placeholder="0"
                                    required
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Fila 4: Categoría e Imagen */}
                        <div className="grid sm:grid-cols-2 gap-6 items-start">
                            <div className="grid gap-2.5">
                                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Categoría de Sistema</Label>
                                <Select
                                    value={formData.categoryId}
                                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                                >
                                    <SelectTrigger className="bg-[#0a0f1a]/50 border-[#2a3f5f]/50 focus:border-[#1a6aff]/50 focus:ring-[#1a6aff]/20 rounded-2xl h-12 text-white font-bold">
                                        <SelectValue placeholder="Categorizar..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111a2d] border-[#2a3f5f] text-white">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id} className="hover:bg-[#1a6aff]/10 focus:bg-[#1a6aff]/20 transition-colors">
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2.5">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Visual del Producto</Label>
                                <div className="group relative">
                                    {preview ? (
                                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-dashed border-[#1a6aff]/30 bg-[#0a0f1a]/50">
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                fill
                                                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreview(null);
                                                    setSelectedFile(null);
                                                    setFormData({ ...formData, imageUrl: "" });
                                                }}
                                                className="absolute top-2 right-2 p-2 bg-[#ff3b5c] text-white rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center aspect-[16/10] w-full rounded-2xl border-2 border-dashed border-[#2a3f5f]/50 bg-[#0a0f1a]/50 hover:border-[#1a6aff]/50 hover:bg-[#1a6aff]/5 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                            <div className="flex flex-col items-center gap-3 text-slate-500 group-hover:text-white transition-colors">
                                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-xl group-hover:border-[#1a6aff]/40 group-hover:bg-[#1a6aff]/10 transition-all">
                                                    <Upload className="h-6 w-6 text-[#1a6aff]" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black uppercase tracking-widest">Subir Imagen</p>
                                                    <p className="text-[9px] font-medium opacity-50">PNG, JPG, WEB-P</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {uploading && (
                            <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-2xl bg-[#1a6aff]/5 border border-[#1a6aff]/10 text-[#1a6aff] text-xs font-black uppercase tracking-widest animate-pulse">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Transfiriendo multimedia al servidor...
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="px-8 py-6 bg-white/[0.02] border-t border-[#2a3f5f]/30 flex flex-col sm:flex-row gap-4 justify-between relative">
                        <Button variant="ghost" asChild disabled={loading} className="text-slate-500 hover:text-white hover:bg-white/10 rounded-xl font-bold px-6 order-2 sm:order-1">
                            <Link href="/admin/products">
                                <X className="mr-2 h-4 w-4" /> Descartar
                            </Link>
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-[#1a6aff] to-[#1df542] hover:shadow-[0_0_30px_rgba(26,106,255,0.4)] text-white font-black uppercase tracking-widest px-10 h-14 rounded-2xl border-0 transition-all duration-500 group relative overflow-hidden order-1 sm:order-2"
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-5 w-5" />
                            )}
                            {product ? "Actualizar Inventario" : "Registrar Producto"}

                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
