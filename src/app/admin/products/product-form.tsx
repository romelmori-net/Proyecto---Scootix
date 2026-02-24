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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { createProduct, updateProduct } from "@/lib/actions/products";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <form onSubmit={handleSubmit}>
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre del Producto</Label>
                        <Input
                            id="name"
                            placeholder="Ej: High-Capacity Battery"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe las características técnicas..."
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Precio ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="299.99"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Inicial</Label>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="10"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoría</Label>
                            <Select
                                value={formData.categoryId}
                                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Imagen del Producto</Label>
                            <div className="flex flex-col gap-4">
                                {preview ? (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-dashed border-primary/20 bg-muted group">
                                        <Image
                                            src={preview}
                                            alt="Preview"
                                            fill
                                            className="object-contain p-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreview(null);
                                                setSelectedFile(null);
                                                setFormData({ ...formData, imageUrl: "" });
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center aspect-video w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                        <div className="flex flex-col items-center gap-2 text-slate-500">
                                            <div className="p-4 rounded-full bg-white shadow-sm border border-slate-100">
                                                <Upload className="h-8 w-8 text-primary" />
                                            </div>
                                            <p className="font-bold">Haz clic o arrastra para subir</p>
                                            <p className="text-sm">PNG, JPG, WebP (Máx 5MB)</p>
                                        </div>
                                    </div>
                                )}
                                {uploading && (
                                    <div className="flex items-center gap-2 text-primary font-bold animate-pulse">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Subiendo imagen...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t py-4">
                    <Button variant="outline" asChild disabled={loading}>
                        <Link href="/admin/products">
                            <X className="mr-2 h-4 w-4" /> Cancelar
                        </Link>
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        {product ? "Actualizar" : "Crear Producto"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
