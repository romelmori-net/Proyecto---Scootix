"use client";

import { useEffect, useState } from "react";
import { getOrderById } from "@/lib/actions/orders";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Calendar, Package, ChevronLeft, MapPin, CreditCard, Receipt, Truck } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function OrderDetailPage() {
    const { t } = useLanguage();
    const { status } = useSession();
    const router = useRouter();
    const params = useParams();
    const orderId = params.id as string;

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push(`/auth/signin?callbackUrl=/orders/${orderId}`);
        }

        async function fetchOrder() {
            try {
                const data = await getOrderById(orderId);
                if (!data) {
                    router.push('/orders');
                    return;
                }
                setOrder(data);
            } catch (error) {
                console.error("Error al cargar detalle del pedido:", error);
                router.push('/orders');
            } finally {
                setLoading(false);
            }
        }

        if (status === "authenticated" && orderId) {
            fetchOrder();
        }
    }, [status, router, orderId]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-primary mr-2"></div>
                <p className="inline-block font-bold">Cargando detalles de tu compra...</p>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                    <Button asChild variant="ghost" className="rounded-xl hover:bg-slate-100">
                        <Link href="/orders" className="flex items-center gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            Volver a mis pedidos
                        </Link>
                    </Button>
                    <Badge className={cn(
                        "rounded-lg font-bold px-4 py-2 text-sm",
                        order.status === 'PENDING' ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                            order.status === 'PROCESSING' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                                order.status === 'SHIPPED' ? "bg-purple-100 text-purple-700 hover:bg-purple-100" :
                                    order.status === 'DELIVERED' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                                        "bg-slate-100 text-slate-700 hover:bg-slate-100"
                    )}>
                        {order.status === 'PENDING' ? 'Pendiente' :
                            order.status === 'PROCESSING' ? 'En Proceso' :
                                order.status === 'SHIPPED' ? 'Enviado' :
                                    order.status === 'DELIVERED' ? 'Entregado' : 'Cancelado'}
                    </Badge>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pedido #{order.id.slice(-8).toUpperCase()}</h1>
                        <p className="text-slate-500 font-medium">Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <Button className="rounded-xl shadow-lg shadow-primary/20 bg-primary text-white font-black px-6 h-12 flex items-center gap-2">
                        <Receipt className="h-5 w-5" />
                        Descargar Factura
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
                                <CardTitle className="flex items-center gap-2 text-lg font-black">
                                    <Package className="h-5 w-5 text-primary" />
                                    Productos comprados
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="h-20 w-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                                                {item.product.imageUrl && (
                                                    <Image
                                                        src={item.product.imageUrl}
                                                        alt={item.product.name}
                                                        width={80}
                                                        height={80}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900 leading-tight">{item.product.name}</p>
                                                <p className="text-sm text-slate-500 mt-1">Cantidad: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${item.price.toFixed(2)} c/u</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="my-6" />
                                <div className="space-y-3">
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Subtotal</span>
                                        <span>${(order.total - 10).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Envío Premium</span>
                                        <span>$10.00</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black text-slate-900 pt-2">
                                        <span>Total</span>
                                        <span className="text-primary">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Info Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
                                <CardTitle className="flex items-center gap-2 text-lg font-black">
                                    <Truck className="h-5 w-5 text-primary" />
                                    Envío y Entrega
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-slate-900">{order.user.name}</p>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            Av. Eléctrica 123, Metrópolis<br />
                                            CP 12345, Lima, Perú
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
                                <CardTitle className="flex items-center gap-2 text-lg font-black">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    Método de Pago
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-14 bg-slate-950 rounded flex items-center justify-center text-[10px] font-black text-white italic">
                                        VISA
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Tarjeta terminada en **** 4567</p>
                                        <p className="text-sm text-slate-400">Pago único autorizado</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
