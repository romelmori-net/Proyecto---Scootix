"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Edit,
    Trash2,
    MoreHorizontal,
    ExternalLink,
    LayoutGrid,
    List as ListIcon,
    Search,
    Package,
    ArrowUpRight,
    Zap,
    ChevronRight,
    Tag,
    Eye,
    Star
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { deleteProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function AdminProductList({ products }: { products: any[] }) {
    const [view, setView] = useState<"list" | "grid">("grid");
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`¿Estás seguro de que deseas eliminar ${name}?`)) {
            const res = await deleteProduct(id);
            if (res.success) {
                toast({
                    title: "Producto eliminado",
                    className: "bg-[#ff3b5c] text-white font-bold border-none"
                });
                router.refresh();
            } else {
                toast({ title: "Error", description: res.error, variant: "destructive" });
            }
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-700">
            {/* Control Bar - Ultra-Compact y Tecnológico */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-3 rounded-3xl bg-[#1E293B]/40 border border-white/5 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                <div className="relative w-full md:w-[400px] group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-[#2563EB] transition-colors" />
                    <input
                        placeholder="Filtrar catálogo Scootix..."
                        className="w-full bg-[#1E293B]/60 border border-white/5 rounded-xl py-2.5 pl-14 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/40 transition-all font-medium text-xs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto relative">
                    <Tabs value={view} onValueChange={(v) => setView(v as "list" | "grid")} className="w-full md:w-auto">
                        <TabsList className="grid w-full grid-cols-2 h-10 rounded-xl bg-[#111827] p-1 border border-white/5">
                            <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-[#2563EB] data-[state=active]:text-white data-[state=active]:shadow-sm font-black uppercase text-[9px] tracking-widest transition-all px-4 text-slate-400">
                                <ListIcon className="h-3.5 w-3.5 mr-2" /> Lista
                            </TabsTrigger>
                            <TabsTrigger value="grid" className="rounded-lg data-[state=active]:bg-[#2563EB] data-[state=active]:text-white data-[state=active]:shadow-sm font-black uppercase text-[9px] tracking-widest transition-all px-4 text-slate-400">
                                <LayoutGrid className="h-3.5 w-3.5 mr-2" /> Grid
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {view === "list" ? (
                <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#1E293B]/30 shadow-xl backdrop-blur-md">
                    <Table>
                        <TableHeader className="bg-[#111827]/50 border-b border-white/5">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="py-6 pl-8 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Imagen</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Producto</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Categoría</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Precio</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Stock</TableHead>
                                <TableHead className="text-right py-6 pr-8 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Opciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <Package className="h-16 w-16 text-slate-400" />
                                            <p className="font-black uppercase tracking-widest text-sm text-slate-500">Catálogo vacío</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow key={product.id} className="border-white/5 hover:bg-[#2563EB]/5 transition-all duration-300 group">
                                        <TableCell className="pl-8 py-5">
                                            <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-[#111827] border border-white/5 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                <Image
                                                    src={product.imageUrl || "/placeholder-scooter.jpg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#F1F5F9] text-base leading-none mb-1 group-hover:text-[#2563EB] transition-colors">{product.name}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Ref: {product.id.substring(0, 8)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <Badge variant="secondary" className="bg-[#111827] text-slate-400 border-white/5 rounded-lg px-3 py-1 font-black text-[9px] uppercase tracking-widest border">
                                                {product.category.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <span className="text-lg font-black text-[#F1F5F9] italic tracking-tighter">${product.price.toFixed(2)}</span>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <div className="flex items-center gap-2.5">
                                                <div className={cn(
                                                    "w-2.5 h-2.5 rounded-full",
                                                    product.stock === 0 ? "bg-[#EF4444] animate-pulse" :
                                                        product.stock <= 5 ? "bg-[#FACC15]" : "bg-[#22C55E]"
                                                )} />
                                                <span className={cn(
                                                    "font-black text-xs uppercase tracking-tight",
                                                    product.stock === 0 ? "text-[#EF4444]" : "text-slate-400"
                                                )}>
                                                    {product.stock} un.
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-8 py-5">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-slate-100 border-none transition-all group/btn">
                                                        <MoreHorizontal className="h-5 w-5 text-slate-400 group-hover/btn:text-slate-900" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 bg-[#111827] border-white/10 text-[#F1F5F9] rounded-[1.5rem] p-2 shadow-2xl backdrop-blur-xl">
                                                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-3 hover:bg-white/5 transition-all font-bold text-xs uppercase tracking-widest">
                                                        <Link href={`/store/${product.id}`} target="_blank" className="flex items-center text-slate-300">
                                                            <ExternalLink className="mr-3 h-4 w-4 text-[#2563EB]" /> Ver en Vivo
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-3 hover:bg-white/5 transition-all font-bold text-xs uppercase tracking-widest">
                                                        <Link href={`/admin/products/${product.id}`} className="flex items-center text-slate-300">
                                                            <Edit className="mr-3 h-4 w-4 text-[#2563EB]" /> Editar Ficha
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <div className="h-px bg-white/5 my-2 mx-1" />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(product.id, product.name)}
                                                        className="text-[#EF4444] rounded-xl cursor-pointer py-3 hover:bg-red-500/10 transition-all font-black text-xs uppercase tracking-widest"
                                                    >
                                                        <Trash2 className="mr-3 h-4 w-4" /> Eliminar Item
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden bg-[#1E293B]/40 border border-white/5 shadow-xl hover:border-[#2563EB]/30 transition-all duration-500 rounded-[2.5rem] group relative backdrop-blur-sm">
                            {/* Signature Line decor - Mutilcolor Pro */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#2563EB] via-[#22C55E] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                            <div className="relative aspect-square bg-[#0F172A]/40 overflow-hidden p-3">
                                <Image
                                    src={product.imageUrl || "/placeholder-scooter.jpg"}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                />

                                {/* Overlay Luminoso al hacer hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2563EB]/5 to-[#2563EB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                                    <Badge className={cn(
                                        "rounded-xl px-4 py-1.5 border-none font-black shadow-xl backdrop-blur-2xl uppercase tracking-widest text-[9px]",
                                        product.stock === 0
                                            ? "bg-[#EF4444] text-white"
                                            : "bg-[#0B1220]/80 text-[#22C55E] border border-[#22C55E]/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                    )}>
                                        <Zap className="h-3 w-3 mr-1.5 fill-current" />
                                        Stock: {product.stock}
                                    </Badge>
                                </div>

                                <div className="absolute inset-x-4 bottom-4 p-4 bg-[#111827]/90 rounded-3xl translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 flex justify-center gap-3 backdrop-blur-xl border border-white/5 shadow-2xl z-30">
                                    <Button size="icon" className="rounded-2xl h-11 w-11 bg-[#1E293B] hover:bg-[#2563EB] text-slate-400 hover:text-white border border-white/5 shadow-lg transition-all" asChild>
                                        <Link href={`/admin/products/${product.id}`}><Edit className="h-5 w-5" /></Link>
                                    </Button>
                                    <Button size="icon" className="rounded-2xl h-11 w-11 bg-[#1E293B] hover:bg-[#2563EB] text-slate-400 hover:text-white border border-white/5 shadow-lg transition-all" asChild>
                                        <Link href={`/store/${product.id}`} target="_blank"><Eye className="h-5 w-5" /></Link>
                                    </Button>
                                    <Button
                                        size="icon"
                                        className="rounded-2xl h-11 w-11 bg-[#1E293B] hover:bg-[#EF4444] text-slate-400 hover:text-white border border-white/5 shadow-lg transition-all"
                                        onClick={() => handleDelete(product.id, product.name)}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-5 pb-10 relative bg-[#1E293B]/60">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shadow-[0_0_5px_#2563EB]" />
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                                {product.category.name}
                                            </span>
                                        </div>
                                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 opacity-40" />
                                    </div>

                                    <h3 className="text-lg font-bold text-[#F1F5F9] truncate tracking-tight leading-none group-hover:text-[#2563EB] transition-colors">{product.name}</h3>

                                    <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Precio Unitario</span>
                                            <p className="text-xl font-black text-[#F1F5F9] italic tracking-tighter drop-shadow-sm">
                                                <span className="text-[#2563EB] not-italic mr-1">$</span>
                                                {product.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="h-9 w-9 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-white/5 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:rotate-12 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                                            <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
