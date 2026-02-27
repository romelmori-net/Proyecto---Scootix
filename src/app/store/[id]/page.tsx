import { getProductById } from "@/lib/actions/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ChevronLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "./add-to-cart-button";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-8">
          <Link href="/store" className="hover:text-primary transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Volver a la Tienda
          </Link>
          <span>/</span>
          <span className="text-slate-600 truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-2xl shadow-slate-200/50">
              <Image
                src={product.imageUrl || "/placeholder-scooter.jpg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="rounded-full px-4 py-1.5 border-primary/20 bg-primary/5 text-primary font-black uppercase tracking-widest text-[10px]">
                {product.category.name}
              </Badge>
              <h1 className="text-4xl xl:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <span className="text-slate-400 font-bold text-sm tracking-wide">(125 valoraciones)</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                <span className="text-slate-400 font-bold text-sm line-through">${(product.price * 1.2).toFixed(2)}</span>
              </div>
              <p className="text-emerald-600 font-black text-sm uppercase tracking-wide">¡En stock y listo para enviar!</p>
            </div>

            <div className="space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl font-black text-lg border-slate-200 hover:bg-slate-50 transition-all">
                Comprar Ahora
              </Button>
            </div>

            {/* Features/Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Garantía Premium</p>
                <p className="text-xs text-slate-500 font-bold">Respaldo total Scootix</p>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-accent" />
                </div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Envío Express</p>
                <p className="text-xs text-slate-500 font-bold">24-48h en tu puerta</p>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Devolución Fácil</p>
                <p className="text-xs text-slate-500 font-bold">30 días sin compromiso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}