import { Button } from "@/components/ui/button";
import { Plus, Package, Zap } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { AdminProductList } from "./product-list";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Área - Navy Dark */}
            <div className="relative p-4 rounded-3xl bg-[#1E293B]/40 border border-white/5 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[8px] font-black uppercase tracking-widest">
                            <Zap className="h-2.5 w-2.5 fill-current" />
                            Gestión de Stock
                        </div>
                        <h1 className="text-xl font-extrabold text-[#F1F5F9] tracking-tighter">
                            Control de <span className="text-[#2563EB] italic">Productos</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#1E293B]/60 px-4 py-2 rounded-2xl border border-white/5 text-center min-w-[90px] shadow-inner">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Total</p>
                            <p className="text-xl font-black text-white leading-none">{products.length}</p>
                        </div>
                        <Button asChild className="bg-[#2563EB] hover:bg-[#1D4ED8] transition-all border-none rounded-xl h-10 px-5 shadow-xl shadow-[#2563EB]/10">
                            <Link href="/admin/products/new" className="flex items-center gap-2 font-black uppercase text-[9px] tracking-widest text-white">
                                <Plus className="h-3.5 w-3.5 font-black" /> Nuevo
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <AdminProductList products={products} />
        </div>
    );
}
