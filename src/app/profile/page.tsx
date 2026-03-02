"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
    User,
    Camera,
    Save,
    Loader2,
    Lock,
    ShieldCheck,
    Smartphone,
    CheckCircle2,
    Key,
    AlertCircle,
    Bell,
    Settings2
} from "lucide-react";
import {
    updateUserProfile,
    requestVerificationCode,
    updateUserPassword
} from "@/lib/actions/users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const { toast } = useToast();

    // States for general profile
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    // States for security
    const [securityLoading, setSecurityLoading] = useState(false);
    const [codeLoading, setCodeLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setImage(session.user.image || "");
        }
    }, [session]);

    if (status === "unauthenticated") {
        router.push("/auth/signin?callbackUrl=/profile");
        return null;
    }

    if (status === "loading") {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            </div>
        );
    }

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await updateUserProfile({ name, image });
            if (result.success) {
                await update({ ...session, user: { ...session?.user, name, image } });
                toast({
                    title: "Perfil Actualizado",
                    description: "Tus datos se han guardado correctamente.",
                });
            } else {
                toast({
                    title: "Error",
                    description: result.error || "No se pudo actualizar el perfil",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error inesperado.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRequestCode = async () => {
        setCodeLoading(true);
        try {
            const res = await requestVerificationCode();
            if (res.success) {
                setCodeSent(true);
                toast({
                    title: "Código Enviado 🛡️",
                    description: res.message,
                });
            } else {
                toast({
                    title: "Error",
                    description: (res as any).error,
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error de conexión",
                description: "No se pudo solicitar el código.",
                variant: "destructive"
            });
        } finally {
            setCodeLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast({
                title: "Error de validación",
                description: "Las contraseñas nuevas no coinciden.",
                variant: "destructive"
            });
            return;
        }

        if (!verificationCode) {
            toast({
                title: "Código requerido",
                description: "Por favor solicita e ingresa el código de verificación.",
                variant: "destructive"
            });
            return;
        }

        setSecurityLoading(true);
        try {
            const res = await updateUserPassword({
                currentPassword,
                newPassword,
                code: verificationCode
            });

            if (res.success) {
                toast({
                    title: "Seguridad Reforzada ✅",
                    description: res.message,
                });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setVerificationCode("");
                setCodeSent(false);
            } else {
                toast({
                    title: "Error de Seguridad",
                    description: (res as any).error,
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error crítico",
                description: "No se pudo actualizar la contraseña.",
                variant: "destructive"
            });
        } finally {
            setSecurityLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setImage(data.url);
                toast({
                    title: "Imagen subida",
                    description: "Tu foto de perfil ha sido cargada con éxito.",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo subir la imagen.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen max-w-4xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Header Dinámico */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <User className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Mi Perfil</h1>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1 flex items-center gap-2">
                                <ShieldCheck className="h-3 w-3 text-green-500" />
                                Cuenta Verificada Scootix
                            </p>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl mb-8 border border-white h-14">
                        <TabsTrigger value="general" className="rounded-xl font-bold px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            Información General
                        </TabsTrigger>
                        <TabsTrigger value="security" className="rounded-xl font-bold px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2">
                            <Lock className="h-3.5 w-3.5" /> Seguridad
                        </TabsTrigger>
                        <TabsTrigger value="preferences" className="rounded-xl font-bold px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2">
                            <Settings2 className="h-3.5 w-3.5" /> Preferencias
                        </TabsTrigger>
                    </TabsList>

                    {/* Contenido General */}
                    <TabsContent value="general">
                        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white/70 backdrop-blur-xl">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="bg-slate-50/50 p-10 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center text-center">
                                    <div className="relative group">
                                        <Avatar className="h-40 w-40 border-8 border-white shadow-2xl transition-transform hover:scale-105 duration-500">
                                            <AvatarImage src={image} className="object-cover" />
                                            <AvatarFallback className="bg-primary text-white text-5xl font-black">
                                                {name?.charAt(0) || session?.user?.email?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <label className="absolute bottom-1 right-1 p-3 bg-primary text-white rounded-2xl shadow-xl cursor-pointer hover:bg-primary/90 hover:rotate-12 transition-all ring-4 ring-white">
                                            <Camera className="h-6 w-6" />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                    <h3 className="mt-8 text-xl font-black text-slate-900">{name || "Usuario Scootix"}</h3>
                                    <p className="text-slate-400 text-sm font-medium">{session?.user?.email}</p>
                                </div>

                                <div className="md:col-span-2 p-10">
                                    <form onSubmit={handleSaveProfile} className="space-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre Completo</Label>
                                                <Input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="rounded-2xl h-14 border-slate-200 focus:ring-primary text-lg font-bold px-6 bg-white shadow-inner"
                                                    placeholder="Tu nombre aquí"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Correo Electrónico</Label>
                                                <Input
                                                    disabled
                                                    value={session?.user?.email || ""}
                                                    className="rounded-2xl h-14 bg-slate-100/50 border-slate-200 text-slate-400 font-medium px-6 cursor-not-allowed"
                                                />
                                                <p className="text-[9px] text-slate-400 font-medium italic mt-1.5 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" /> El email no puede ser modificado por seguridad.
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full rounded-2xl h-16 font-black text-lg bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                                            disabled={loading}
                                        >
                                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
                                            Actualizar Identidad
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* Contenido Seguridad */}
                    <TabsContent value="security">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Información de Seguridad */}
                            <div className="space-y-6">
                                <Card className="border-none shadow-lg rounded-[2rem] bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 text-white relative overflow-hidden h-full">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3 relative z-10">
                                        <Smartphone className="h-6 w-6 text-primary" />
                                        Seguridad de 2 Pasos
                                    </h3>
                                    <p className="text-slate-400 font-medium leading-relaxed relative z-10">
                                        Para realizar cambios sensibles como tu contraseña, requerimos una validación adicional mediante un código temporal generado por el sistema.
                                    </p>
                                    <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-200">Encriptación AES-256</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <ShieldCheck className="h-4 w-4 text-primary" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-200">Protección contra Brute-Force</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Formulario cambio contraseña */}
                            <Card className="border-none shadow-xl rounded-[2rem] bg-white p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <Key className="h-5 w-5 text-primary" />
                                    Cambiar Contraseña
                                </h3>

                                <form onSubmit={handleUpdatePassword} className="space-y-5">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contraseña Actual</Label>
                                            <Input
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="rounded-xl h-12 border-slate-200 focus:ring-primary/20"
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nueva Contraseña</Label>
                                            <Input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="rounded-xl h-12 border-slate-200 focus:ring-primary/20"
                                                placeholder="Nueva clave"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Confirmar Nueva Contraseña</Label>
                                            <Input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="rounded-xl h-12 border-slate-200 focus:ring-primary/20"
                                                placeholder="Repite nueva clave"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        {!codeSent ? (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full rounded-xl h-12 font-bold border-2 border-primary/20 text-primary hover:bg-primary/5"
                                                onClick={handleRequestCode}
                                                disabled={codeLoading}
                                            >
                                                {codeLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Smartphone className="h-4 w-4 mr-2" />}
                                                Solicitar Código de Validación
                                            </Button>
                                        ) : (
                                            <div className="space-y-4 animate-in zoom-in-95 duration-300">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center justify-between">
                                                        Ingresa el código
                                                        <span className="text-slate-400 normal-case font-medium">Revisa tu consola local</span>
                                                    </Label>
                                                    <Input
                                                        value={verificationCode}
                                                        onChange={(e) => setVerificationCode(e.target.value)}
                                                        className="rounded-xl h-14 border-primary/40 text-center text-2xl font-black tracking-[0.5em] focus:ring-primary/20"
                                                        placeholder="000000"
                                                        maxLength={6}
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full rounded-xl h-14 font-black bg-slate-900 hover:bg-black text-white uppercase tracking-widest shadow-xl"
                                                    disabled={securityLoading}
                                                >
                                                    {securityLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <ShieldCheck className="h-5 w-5 mr-2" />}
                                                    Confirmar y Cambiar
                                                </Button>
                                                <button
                                                    type="button"
                                                    onClick={() => setCodeSent(false)}
                                                    className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
                                                >
                                                    ¿No recibiste el código? Reintentar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Contenido Preferencias */}
                    <TabsContent value="preferences">
                        <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <Bell className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Personalización</h3>
                                    <p className="text-slate-500 text-sm font-medium">Configura cómo interactúas con Scootix.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100/50">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-900 text-sm uppercase tracking-tight">Notificaciones de Pedidos</p>
                                        <p className="text-xs text-slate-500 font-medium">Recibe actualizaciones sobre el estado de tus compras y envíos.</p>
                                    </div>
                                    <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer ring-4 ring-primary/10">
                                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100/50">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-900 text-sm uppercase tracking-tight">Alertas de Seguridad</p>
                                        <p className="text-xs text-slate-500 font-medium">Te avisaremos sobre inicios de sesión sospechosos o cambios de clave.</p>
                                    </div>
                                    <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer ring-4 ring-primary/10">
                                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100/50">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-900 text-sm uppercase tracking-tight">Ofertas y Lanzamientos</p>
                                        <p className="text-xs text-slate-500 font-medium">Sé el primero en enterarte de nuevos repuestos y kits de mejora.</p>
                                    </div>
                                    <div className="h-6 w-11 bg-slate-200 rounded-full relative cursor-pointer text-slate-300">
                                        <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Configuración del Sistema v2.4</p>
                                <Button variant="ghost" className="text-xs font-black text-primary uppercase tracking-widest hover:bg-primary/5">Restablecer todo</Button>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
