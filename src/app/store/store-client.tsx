"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Tag, Package } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

export function StoreClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
    const { t } = useLanguage();
    const { addToCart } = useCart();
    const { toast } = useToast();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = initialProducts
        .filter(p => selectedCategory === "all" || p.category.name.toLowerCase() === selectedCategory.toLowerCase())
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAddToCart = (product: any) => {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category.name,
            image: {
                imageUrl: product.imageUrl || '/placeholder-scooter.jpg',
                description: product.name,
                imageHint: product.name
            }
        };
        addToCart(cartProduct as any);
        toast({
            title: t('addedToCart') || "Añadido al carrito",
            description: `${product.name} ${t('addedToCartDesc') || 'ha sido añadido.'}`,
        });
    };

    return (
        <>
            {/* Buscador Premium */}
            <div className="relative max-w-xl mx-auto mb-8">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-[#0EA5E9]" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="¿Qué estás buscando?"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#0EA5E9]/40 bg-[#0F172A] text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300 text-base shadow-[0_0_20px_rgba(14,165,233,0.1)]"
                />
            </div>

            {/* Filtros de categoría */}
            <div className="flex justify-center mb-10">
                <div className="flex flex-wrap gap-2 justify-center">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${selectedCategory === "all"
                                ? "bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                                : "bg-transparent border-white/20 text-slate-300 hover:border-[#0EA5E9]/60 hover:text-white"
                            }`}
                    >
                        {t('all') || 'Todos'}
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name.toLowerCase())}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${selectedCategory === category.name.toLowerCase()
                                    ? "bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                                    : "bg-transparent border-white/20 text-slate-300 hover:border-[#0EA5E9]/60 hover:text-white"
                                }`}
                        >
                            {t(category.name.toLowerCase()) || category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contador de resultados */}
            {searchQuery && (
                <p className="text-center text-slate-400 text-sm mb-6">
                    {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} para <span className="text-[#0EA5E9] font-bold">"{searchQuery}"</span>
                </p>
            )}

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group relative rounded-2xl overflow-hidden border border-[#0EA5E9]/20 bg-[#0F172A] hover:border-[#0EA5E9]/60 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-300 flex flex-col"
                    >
                        {/* Badge de categoría */}
                        <div className="absolute top-3 left-3 z-10">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide bg-[#0EA5E9]/20 text-[#0EA5E9] border border-[#0EA5E9]/30 backdrop-blur-sm">
                                <Tag className="h-2.5 w-2.5" />
                                {product.category.name}
                            </span>
                        </div>

                        {/* Imagen */}
                        <Link href={`/store/${product.id}`} className="block">
                            <div className="aspect-square overflow-hidden bg-[#1E293B]">
                                <Image
                                    src={product.imageUrl || '/placeholder-scooter.jpg'}
                                    alt={product.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </Link>

                        {/* Contenido */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-base text-white leading-tight mb-1 group-hover:text-[#0EA5E9] transition-colors duration-200">
                                <Link href={`/store/${product.id}`}>{product.name}</Link>
                            </h3>

                            {/* Stock */}
                            <div className="flex items-center gap-1.5 mb-3">
                                <Package className="h-3 w-3 text-slate-400" />
                                <span className={`text-xs font-semibold ${product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {product.stock <= 0 ? 'Sin stock' : product.stock <= 10 ? `Solo ${product.stock} disponibles` : `${product.stock} en stock`}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                                <p className="text-2xl font-black text-white">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.stock <= 0}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${product.stock <= 0
                                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                            : 'bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] active:scale-95'
                                        }`}
                                >
                                    <ShoppingCart className="h-3.5 w-3.5" />
                                    {product.stock <= 0 ? (t('outOfStock') || 'Sin Stock') : (t('add') || 'Añadir')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Estado vacío */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg font-semibold">No se encontraron productos</p>
                    <p className="text-slate-500 text-sm mt-1">Intenta con otro término o categoría</p>
                </div>
            )}
        </>
    );
}
