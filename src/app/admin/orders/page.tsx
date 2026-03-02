"use client";

import { getOrders } from "@/lib/actions/orders";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useLanguage } from "@/context/language-context";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getOrders().then(setData);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Área - Navy Dark */}
      <div className="relative p-4 rounded-3xl bg-[#1E293B]/40 border border-white/5 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[8px] font-black uppercase tracking-widest">
              <ShoppingCart className="h-2.5 w-2.5 fill-current" />
              Gestión Operativa
            </div>
            <h1 className="text-xl font-extrabold text-[#F1F5F9] tracking-tighter">
              Control de <span className="text-[#2563EB] italic">Pedidos</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#111827] px-4 py-2 rounded-2xl border border-white/5 text-center min-w-[90px] shadow-inner font-sans">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total</p>
              <p className="text-xl font-black text-[#F1F5F9] leading-none">{data.length}</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
