"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "@/lib/actions/orders";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Calendar, Package, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserOrdersPage() {
    const { t } = useLanguage();
    const { status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin?callbackUrl=/orders");
        }

        async function fetchOrders() {
            try {
                const data = await getUserOrders();
                setOrders(data);
            } catch (error) {
                console.error("Error al cargar pedidos:", error);
            } finally {
                setLoading(false);
            }
        }

        if (status === "authenticated") {
            fetchOrders();
        }
    }, [status, router]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-primary mr-2"></div>
                <p className="inline-block font-bold">Cargando tus pedidos...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <ShoppingBag className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mis Pedidos</h1>
                        <p className="text-slate-500 font-medium">Historial detallado de tus compras en Scootix.</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <Card className="border-none shadow-sm rounded-[2rem] p-12 text-center">
                        <Package className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900">Aún no tienes pedidos</h3>
                        <p className="text-slate-500 mb-6">Explora nuestra tienda y descubre lo mejor en movilidad eléctrica.</p>
                        <button
                            onClick={() => router.push('/store')}
                            className="bg-primary text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                        >
                            Ir a la Tienda
                        </button>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Card key={order.id} className="border-none shadow-sm rounded-[2rem] overflow-hidden group hover:shadow-md transition-all border-l-4 border-l-primary">
                                <CardHeader className="bg-slate-50/50 p-6 flex flex-row items-center justify-between border-b border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm">
                                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">ID DEL PEDIDO</p>
                                            <p className="font-black text-slate-900">#{order.id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <Separator orientation="vertical" className="h-8" />
                                        <div className="text-sm">
                                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">FECHA</p>
                                            <p className="font-black text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Badge className={cn(
                                        "rounded-lg font-bold px-3 py-1",
                                        order.status === 'PENDING' ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                                            order.status === 'SHIPPED' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                                                order.status === 'DELIVERED' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                                                    "bg-slate-100 text-slate-700 hover:bg-slate-100"
                                    )}>
                                        {order.status}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="h-16 w-16 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                                                    {item.product.imageUrl && (
                                                        <Image
                                                            src={item.product.imageUrl}
                                                            alt={item.product.name}
                                                            width={64}
                                                            height={64}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-slate-900">{item.product.name}</p>
                                                    <p className="text-sm text-slate-500">Cantidad: {item.quantity} × ${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="my-6" />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-500 font-bold text-xs">TOTAL PAGADO</p>
                                            <p className="text-2xl font-black text-primary">${order.total.toFixed(2)}</p>
                                        </div>
                                        <Button asChild variant="ghost" className="rounded-xl group-hover:bg-primary group-hover:text-white transition-all gap-2">
                                            <Link href={`/orders/${order.id}`}>
                                                Ver Detalle
                                                <ChevronRight className="h-5 w-5" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Separator({ className, orientation = "horizontal" }: { className?: string; orientation?: "horizontal" | "vertical" }) {
    return (
        <div className={cn(
            "bg-slate-200",
            orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
            className
        )} />
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
