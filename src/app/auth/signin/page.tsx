"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import * as Icons from "lucide-react";

export default function SignInPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                toast({
                    title: "Acceso Denegado",
                    description: "Credenciales inválidas. Por seguridad, verifica tus datos.",
                    variant: "destructive",
                });
            } else {
                const response = await fetch('/api/auth/session');
                const session = await response.json();

                toast({
                    title: "¡Bienvenido de nuevo!",
                    description: "Has iniciado sesión correctamente.",
                });

                if (session?.user?.role === "ADMIN") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            }
        } catch (error) {
            toast({
                title: "Error de Sistema",
                description: "Hubo un problema al procesar tu solicitud.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117] relative overflow-hidden text-slate-100 selection:bg-[#1a6aff]/30">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-[#1a6aff]/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-[420px] px-6 py-12 flex flex-col items-center">
                
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-800 to-slate-700 p-[1px] shadow-2xl shadow-black/50 mb-6">
                        <div className="w-full h-full bg-[#111827] rounded-[23px] flex items-center justify-center">
                            <Icons.Zap className="h-8 w-8 text-white fill-white" />
                        </div>
                    </div>
                    <h1 className="text-[28px] leading-tight font-medium text-white mb-2 tracking-tight text-center">
                        Accede a <span className="font-semibold">Scootix</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-medium text-center">
                        Energía que te mueve. Administra tu experiencia.
                    </p>
                </div>

                {/* OAuth & Login Actions */}
                <div className="w-full space-y-4">
                    
                    {/* Botón Principal: Google */}
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        type="button"
                        className="w-full h-14 bg-white hover:bg-slate-100 text-slate-900 rounded-full font-medium text-[15px] flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-white/5"
                    >
                        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.25.81-.59z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continuar con Google
                    </button>

                    {/* Fila de Proveedores Extra (Opcional, Github/Apple - Desactivados visualmente como demostración) */}
                    <div className="grid grid-cols-3 gap-3">
                        <button disabled className="h-14 bg-[#1c2128] border border-slate-800 rounded-full flex items-center justify-center hover:bg-[#222831] transition-colors opacity-50 cursor-not-allowed">
                            <Icons.Github className="h-5 w-5 text-slate-300" />
                        </button>
                        <button disabled className="h-14 bg-[#1c2128] border border-slate-800 rounded-full flex items-center justify-center hover:bg-[#222831] transition-colors opacity-50 cursor-not-allowed">
                            <Icons.Apple className="h-5 w-5 text-slate-300 fill-slate-300" />
                        </button>
                        <button disabled className="h-14 bg-[#1c2128] border border-slate-800 rounded-full flex items-center justify-center hover:bg-[#222831] transition-colors opacity-50 cursor-not-allowed">
                            <Icons.Facebook className="h-5 w-5 text-[#1877F2]" />
                        </button>
                    </div>

                    {/* Email Toggle */}
                    {!showEmailForm ? (
                        <button
                            onClick={() => setShowEmailForm(true)}
                            type="button"
                            className="w-full h-14 bg-[#1c2128] hover:bg-[#252a33] text-slate-300 rounded-full font-medium text-[15px] flex items-center justify-center gap-3 transition-colors border border-slate-800"
                        >
                            <Icons.Mail className="h-[18px] w-[18px] text-slate-400" />
                            Continuar con Email
                        </button>
                    ) : (
                        <div className="pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Nombre de usuario o Email"
                                        required
                                        className="h-14 bg-[#1c2128] border-slate-800 text-slate-200 rounded-xl px-5 focus-visible:ring-1 focus-visible:ring-slate-600 focus-visible:border-slate-600 placeholder:text-slate-500"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        required
                                        className="h-14 bg-[#1c2128] border-slate-800 text-slate-200 rounded-xl px-5 focus-visible:ring-1 focus-visible:ring-slate-600 focus-visible:border-slate-600 placeholder:text-slate-500"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center justify-between px-1">
                                    <button type="button" onClick={() => setShowEmailForm(false)} className="text-xs text-slate-400 hover:text-white transition-colors">Volver a los métodos principales</button>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-white hover:bg-slate-200 text-slate-900 rounded-xl font-medium text-[15px] mt-2 transition-all"
                                >
                                    {loading ? "Verificando..." : "Acceder ahora"}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Footer terms */}
                <div className="mt-12 text-center space-y-1">
                    <p className="text-slate-500 text-[11px] font-medium">Al continuar, aceptas nuestros</p>
                    <p className="text-[11px] font-medium">
                        <Link href="/terms" className="text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-2 transition-colors">
                            Términos de Servicio
                        </Link>
                        <span className="text-slate-600 mx-1.5">y</span>
                        <Link href="/privacy" className="text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-2 transition-colors">
                            Política de Privacidad
                        </Link>.
                    </p>
                </div>

            </div>
        </div>
    );
}
