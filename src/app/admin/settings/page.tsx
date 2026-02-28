"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Shield, Palette, Save, Globe, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Ajustes Guardados",
                description: "La configuración se ha actualizado correctamente.",
            });
        }, 1000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <Settings className="h-8 w-8" />
                    </div>
                    Configuración del Sistema
                </h1>
                <p className="text-slate-500 font-medium mt-2">Gestiona las preferencias globales de tu tienda Scootix.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-white border border-slate-200 p-1 h-14 rounded-2xl shadow-sm mb-8">
                    <TabsTrigger value="general" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        <Globe className="h-4 w-4 mr-2" /> General
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        <Bell className="h-4 w-4 mr-2" /> Notificaciones
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        <Shield className="h-4 w-4 mr-2" /> Seguridad
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        <Palette className="h-4 w-4 mr-2" /> Apariencia
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                            <CardTitle className="text-xl font-black">Información de la Tienda</CardTitle>
                            <CardDescription>Detalles básicos que verán tus clientes.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-slate-700 ml-1">Nombre del Sitio</Label>
                                    <Input defaultValue="Scootix" className="rounded-xl h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-slate-700 ml-1">Email de Contacto</Label>
                                    <Input defaultValue="info@scootix.com" className="rounded-xl h-12" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="font-bold text-slate-700 ml-1">WhatsApp de Soporte</Label>
                                    <Input defaultValue="+51 987 654 321" className="rounded-xl h-12" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <div>
                                    <p className="font-bold text-slate-900">Modo Mantenimiento</p>
                                    <p className="text-sm text-slate-500">Desactiva la tienda temporalmente para el público.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                            <CardTitle className="text-xl font-black">Autenticación y Accesos</CardTitle>
                            <CardDescription>Configura cómo los usuarios acceden al sistema.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <Globe className="h-6 w-6 text-blue-500" />
                                    <div>
                                        <p className="font-bold text-slate-900">Login con Google</p>
                                        <p className="text-sm text-slate-500">Permitir a los usuarios loguear con su cuenta de Google.</p>
                                    </div>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <Shield className="h-6 w-6 text-green-500" />
                                    <div>
                                        <p className="font-bold text-slate-900">Registro de Usuarios Administradores</p>
                                        <p className="text-sm text-slate-500">Solo permitir registros de emails en la lista blanca.</p>
                                    </div>
                                </div>
                                <Switch checked={true} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <div className="flex justify-end pt-4">
                    <Button
                        onClick={handleSave}
                        className="rounded-xl h-12 px-8 font-black shadow-lg shadow-primary/20 flex items-center gap-2"
                        disabled={loading}
                    >
                        <Save className="h-5 w-5" />
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </div>
            </Tabs>
        </div>
    );
}
