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
    AlertCircle,
    LayoutGrid,
    List as ListIcon,
    Search,
    Filter,
    ArrowUpDown,
    Package,
    ArrowRight
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { deleteProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function AdminProductList({ products }: { products: any[] }) {
    const [view, setView] = useState<"list" | "grid">("list");
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
                toast({ title: "Producto eliminado" });
                router.refresh();
            } else {
                toast({ title: "Error", description: res.error, variant: "destructive" });
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Buscar por nombre o categoría..."
                        className="pl-10 h-11 bg-slate-50 border-none rounded-xl focus-visible:ring-primary/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Tabs value={view} onValueChange={(v) => setView(v as "list" | "grid")} className="w-full md:w-auto">
                        <TabsList className="grid w-full grid-cols-2 h-11 rounded-xl bg-slate-100 p-1">
                            <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <ListIcon className="h-4 w-4 mr-2" /> Lista
                            </TabsTrigger>
                            <TabsTrigger value="grid" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <LayoutGrid className="h-4 w-4 mr-2" /> Grid
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {view === "list" ? (
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="border-slate-100 hover:bg-transparent">
                                <TableHead className="w-[80px] py-4 pl-6 text-xs font-black uppercase text-slate-500 tracking-widest">Imagen</TableHead>
                                <TableHead className="py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Producto</TableHead>
                                <TableHead className="py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Categoría</TableHead>
                                <TableHead className="py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Precio</TableHead>
                                <TableHead className="py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Stock</TableHead>
                                <TableHead className="text-right py-4 pr-6 text-xs font-black uppercase text-slate-500 tracking-widest">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-48 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-3">
                                            <Package className="h-10 w-10 opacity-20" />
                                            <p className="font-medium">No se encontraron productos</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow key={product.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                        <TableCell className="pl-6 py-4">
                                            <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                                                <Image
                                                    src={product.imageUrl || "/placeholder-scooter.jpg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 leading-none mb-1">{product.name}</span>
                                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-black">ID: {product.id.substring(0, 8)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none rounded-lg px-2 py-0.5 font-bold">
                                                {product.category.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <span className="font-black text-slate-900">${product.price.toFixed(2)}</span>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    product.stock === 0 ? "bg-red-500 animate-pulse" :
                                                        product.stock <= 5 ? "bg-amber-500" : "bg-emerald-500"
                                                )} />
                                                <span className={cn(
                                                    "font-bold",
                                                    product.stock === 0 ? "text-red-600" : "text-slate-700"
                                                )}>
                                                    {product.stock} un.
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6 py-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm border-none">
                                                        <MoreHorizontal className="h-5 w-5 text-slate-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-2xl shadow-xl border-slate-100 p-2">
                                                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5">
                                                        <Link href={`/store/${product.id}`} target="_blank">
                                                            <ExternalLink className="mr-3 h-4 w-4 text-slate-400" /> Ver en Tienda
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5">
                                                        <Link href={`/admin/products/${product.id}`}>
                                                            <Edit className="mr-3 h-4 w-4 text-slate-400" /> Editar
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <div className="h-px bg-slate-50 my-1 mx-1" />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(product.id, product.name)}
                                                        className="text-red-600 font-bold rounded-xl cursor-pointer py-2.5 focus:bg-red-50 focus:text-red-600"
                                                    >
                                                        <Trash2 className="mr-3 h-4 w-4" /> Eliminar
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] group">
                            <div className="relative aspect-square bg-slate-50">
                                <Image
                                    src={product.imageUrl || "/placeholder-scooter.jpg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <Badge className={cn(
                                        "rounded-full px-3 py-1 border-none font-black shadow-lg",
                                        product.stock === 0 ? "bg-red-500" : "bg-white text-slate-900"
                                    )}>
                                        {product.stock} un.
                                    </Badge>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-3">
                                    <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-white hover:bg-white text-slate-900 shadow-xl" asChild>
                                        <Link href={`/admin/products/${product.id}`}><Edit className="h-4 w-4" /></Link>
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="rounded-full h-10 w-10 shadow-xl"
                                        onClick={() => handleDelete(product.id, product.name)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-white hover:bg-white text-slate-900 shadow-xl" asChild>
                                        <Link href={`/store/${product.id}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link>
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="pt-6 px-6 pb-6 text-center">
                                <Badge variant="outline" className="mb-2 rounded-lg border-blue-100 text-blue-500 font-bold uppercase tracking-widest text-[10px] px-3">
                                    {product.category.name}
                                </Badge>
                                <h3 className="text-xl font-black text-slate-900 truncate mb-2">{product.name}</h3>
                                <p className="text-2xl font-black text-primary">${product.price.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full h-48 flex flex-col items-center justify-center text-slate-400 gap-3 border-2 border-dashed border-slate-100 rounded-[2rem]">
                            <Package className="h-10 w-10 opacity-20" />
                            <p className="font-medium">No se encontraron productos</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
