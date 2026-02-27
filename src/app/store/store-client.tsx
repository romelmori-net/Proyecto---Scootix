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
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto w-full">
            {/* Sidebar - Filtros */}
            <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-32 animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
                    {/* Elemento decorativo tech */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[50px] blur-2xl pointer-events-none" />

                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <Tag className="h-5 w-5 text-primary" />
                        Explorar
                    </h3>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCategory === "all"
                                ? "bg-primary text-white shadow-md scale-[1.02]"
                                : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-primary"
                                }`}
                        >
                            <span className="flex-1 text-left">{t('all') || 'Todos los Productos'}</span>
                            {selectedCategory === "all" && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name.toLowerCase())}
                                className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCategory === category.name.toLowerCase()
                                    ? "bg-primary text-white shadow-md scale-[1.02]"
                                    : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-primary"
                                    }`}
                            >
                                <span className="flex-1 text-left">{t(category.name.toLowerCase()) || category.name}</span>
                                {selectedCategory === category.name.toLowerCase() && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Contenido Principal */}
            <div className="flex-1 flex flex-col w-full min-w-0">
                {/* Buscador Premium */}
                <div className="relative w-full mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar repuestos, accesorios..."
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base shadow-sm"
                    />
                </div>

                {/* Contador de resultados */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                    <p className="text-slate-600 font-medium text-sm">
                        Mostrando <span className="text-slate-900 font-bold">{filteredProducts.length}</span> producto{filteredProducts.length !== 1 ? 's' : ''}
                    </p>
                    {searchQuery && (
                        <p className="text-sm font-medium text-slate-600">
                            Filtro: <span className="text-primary font-bold">"{searchQuery}"</span>
                        </p>
                    )}
                </div>

                {/* Grid de Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:border-primary/30 hover:shadow-xl transition-all duration-500 flex flex-col"
                        >
                            {/* Linea oblicua decorativa de la card */}
                            <div className="absolute top-0 right-0 w-16 h-[3px] bg-primary skew-x-[-45deg] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Badge de categoría */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-white/90 text-primary border border-slate-100 backdrop-blur-md shadow-sm">
                                    <Tag className="h-3 w-3" />
                                    {product.category.name}
                                </span>
                            </div>

                            {/* Imagen */}
                            <Link href={`/store/${product.id}`} className="block relative">
                                <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                                    <Image
                                        src={product.imageUrl || '/placeholder-scooter.jpg'}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>

                            {/* Contenido */}
                            <div className="p-6 flex flex-col flex-grow relative z-10 bg-white">
                                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                                    <Link href={`/store/${product.id}`}>{product.name}</Link>
                                </h3>

                                {/* Stock */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className={`p-1 rounded-full ${product.stock > 10 ? 'bg-accent/10 text-accent' : product.stock > 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                                        <Package className="h-3 w-3" />
                                    </div>
                                    <span className={`text-xs font-bold tracking-wide uppercase ${product.stock > 10 ? 'text-accent' : product.stock > 0 ? 'text-yellow-600' : 'text-red-500'}`}>
                                        {product.stock <= 0 ? 'Agotado' : product.stock <= 10 ? `Últimos ${product.stock}` : `${product.stock} Disponible`}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.stock <= 0}
                                        className={`flex items-center justify-center h-12 w-12 rounded-2xl transition-all duration-300 ${product.stock <= 0
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 active:scale-95'
                                            }`}
                                        title={product.stock <= 0 ? (t('outOfStock') || 'Sin Stock') : (t('add') || 'Añadir')}
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Estado vacío */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-24 bg-white border border-slate-200 rounded-3xl mt-6 shadow-sm">
                        <div className="w-20 h-20 mx-auto bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6">
                            <Search className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-900 text-xl font-black mb-2">Sin resultados</h3>
                        <p className="text-slate-500 text-sm font-medium">No encontramos productos que coincidan con tu búsqueda.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                            className="mt-6 text-primary hover:text-primary/80 font-bold text-sm transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
