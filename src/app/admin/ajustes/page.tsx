"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Shield, Palette, Save, Globe, Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getSiteSettings, updateSiteSettings } from "@/lib/actions/settings";

export default function SettingsPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const [formData, setFormData] = useState({
        businessName: "",
        email: "",
        phone: "",
        whatsapp: "",
        address: "",
        hours: "",
        whatsappMessage: ""
    });

    useEffect(() => {
        const loadSettings = async () => {
            const data = await getSiteSettings();
            if (data) {
                setFormData({
                    businessName: data.businessName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    whatsapp: data.whatsapp || "",
                    address: data.address || "",
                    hours: data.hours || "",
                    whatsappMessage: data.whatsappMessage || ""
                });
            }
            setInitialLoading(false);
        };
        loadSettings();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        const result = await updateSiteSettings(formData);

        if (result.success) {
            toast({
                title: "Ajustes Guardados",
                description: "La configuración se ha sincronizado con la base de datos.",
            });
        } else {
            toast({
                title: "Error al guardar",
                description: result.error || "Ocurrió un error inesperado",
                variant: "destructive"
            });
        }
        setLoading(false);
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header Área - Navy Dark */}
            <div className="relative p-4 rounded-3xl bg-[#1E293B]/40 border border-white/5 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#2563EB]/5 to-[#22C55E]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[8px] font-black uppercase tracking-widest">
                            <Settings className="h-3 w-3" />
                            Configuración Pro
                        </div>
                        <h1 className="text-xl font-extrabold text-[#F1F5F9] tracking-tighter">
                            Sistema de <span className="text-[#2563EB] italic">Control</span>
                        </h1>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-[#111827] border border-white/5 p-1 h-12 rounded-2xl shadow-xl mb-6 flex w-fit">
                    <TabsTrigger value="general" className="rounded-xl px-5 font-black text-[10px] uppercase tracking-widest text-slate-400 transition-all data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
                        <Globe className="h-3.5 w-3.5 mr-1.5" /> General
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-xl px-5 font-black text-[10px] uppercase tracking-widest text-slate-400 transition-all data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
                        <MessageCircle className="h-3.5 w-3.5 mr-1.5" /> WhatsApp
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-xl px-5 font-black text-[10px] uppercase tracking-widest text-slate-400 transition-all data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
                        <Shield className="h-3.5 w-3.5 mr-1.5" /> Seguridad
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card className="bg-[#1E293B]/40 border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                        <CardHeader className="p-8 border-b border-white/5">
                            <CardTitle className="text-xl font-black text-[#F1F5F9] tracking-tight">Identidad de Marca & Contacto</CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Información central que define la presencia del negocio en la web.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Nombre Comercial</Label>
                                    <Input value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className="bg-[#111827] border-white/5 focus:border-[#2563EB]/50 focus:ring-[#2563EB]/20 rounded-2xl h-14 text-white font-bold" />
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Corporativo</Label>
                                    <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-[#111827] border-white/5 focus:border-[#2563EB]/50 focus:ring-[#2563EB]/20 rounded-2xl h-14 text-white font-bold" />
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Teléfono (Llamadas)</Label>
                                    <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-[#111827] border-white/5 focus:border-[#2563EB]/50 focus:ring-[#2563EB]/20 rounded-2xl h-14 text-white font-black" />
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Horario de Atención</Label>
                                    <Input value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: e.target.value })} className="bg-[#111827] border-white/5 focus:border-[#2563EB]/50 focus:ring-[#2563EB]/20 rounded-2xl h-14 text-white" />
                                </div>
                                <div className="space-y-2.5 md:col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Dirección Física</Label>
                                    <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="bg-[#111827] border-white/5 focus:border-[#2563EB]/50 focus:ring-[#2563EB]/20 rounded-2xl h-14 text-white" />
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-between group hover:bg-[#2563EB]/10 transition-all">
                                <div className="space-y-1">
                                    <p className="font-black text-[#F1F5F9] uppercase tracking-wider text-[11px]">Modo Mantenimiento</p>
                                    <p className="text-xs text-slate-400 font-medium">Desactiva el acceso público mientras ajustas el stock.</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-[#2563EB]" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <Card className="bg-[#1E293B]/40 border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                        <CardHeader className="p-8 border-b border-white/5">
                            <CardTitle className="text-xl font-black text-[#F1F5F9] tracking-tight">Integración WhatsApp</CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Configura el número y mensaje para el botón flotante que verán los clientes.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Número de WhatsApp (Sin + ni espacios)</Label>
                                    <Input value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} placeholder="Ej: 51987654321" className="bg-[#111827] border-[#22C55E]/30 focus:border-[#22C55E]/80 focus:ring-[#22C55E]/20 rounded-2xl h-14 text-[#22C55E] font-bold" />
                                    <p className="text-xs text-slate-500 ml-2 mt-1">Este es el número al que el cliente enviará el mensaje directo cuando haga clic en el widget.</p>
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Mensaje Predefinido</Label>
                                    <Input value={formData.whatsappMessage} onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })} className="bg-[#111827] border-white/5 focus:border-[#2563EB]/50 focus:ring-[#2563EB]/20 rounded-2xl h-14 text-white" />
                                    <p className="text-xs text-slate-500 ml-2 mt-1">Texto automático con el que iniciará la conversación el cliente.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card className="bg-[#1E293B]/40 border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                        <CardHeader className="p-8 border-b border-white/5">
                            <CardTitle className="text-xl font-black text-[#F1F5F9] tracking-tight">Sistemas de Protección</CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Controla el cifrado y los privilegios de conexión.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between p-6 bg-[#111827] border border-white/5 rounded-3xl group hover:border-[#2563EB]/30 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                                        <Globe className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-[#F1F5F9] uppercase tracking-wider text-[11px]">Google Auth Integration</p>
                                        <p className="text-xs text-slate-500 font-medium italic">Protocolo OAuth 2.0 para acceso rápido y seguro.</p>
                                    </div>
                                </div>
                                <Switch checked={true} className="data-[state=checked]:bg-[#2563EB]" />
                            </div>

                            <div className="flex items-center justify-between p-6 bg-[#111827] border border-white/5 rounded-3xl group hover:border-[#22C55E]/30 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 rounded-2xl bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-[#F1F5F9] uppercase tracking-wider text-[11px]">Control de Privilegios</p>
                                        <p className="text-xs text-slate-500 font-medium italic">Solo permitir administradores autenticados via Whitelist.</p>
                                    </div>
                                </div>
                                <Switch checked={true} className="data-[state=checked]:bg-[#22C55E]" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <div className="flex justify-end pt-8">
                    <Button
                        onClick={handleSave}
                        className="bg-[#2563EB] hover:bg-[#1D4ED8] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] text-white font-black uppercase tracking-widest px-12 h-16 rounded-[2rem] border-0 transition-all duration-500 group relative overflow-hidden"
                        disabled={loading || initialLoading}
                    >
                        {loading ? (
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        ) : (
                            <Save className="mr-3 h-6 w-6" />
                        )}
                        <span className="relative z-10">{loading ? "Sincronizando..." : "Actualizar Sistema"}</span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
                    </Button>
                </div>
            </Tabs>
        </div>
    );
}

