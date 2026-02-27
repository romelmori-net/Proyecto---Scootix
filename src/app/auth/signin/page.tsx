"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import * as Icons from "lucide-react";

export default function SignInPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
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
        <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 md:p-10 overflow-hidden bg-slate-50">
            {/* Background con overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80"
                    alt="Background"
                    fill
                    className="object-cover opacity-10 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-slate-100/50" />
            </div>

            <Card className="relative z-10 w-full max-w-[440px] border border-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-white/90 backdrop-blur-2xl overflow-hidden mx-auto">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

                <CardHeader className="space-y-3 pt-12 pb-6 text-center px-8">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                        <Icons.ShieldCheck className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">
                            {t('signIn')}
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium text-base">
                            Bienvenido a <span className="text-primary font-bold">Scootix</span>
                        </CardDescription>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-5 px-8 md:px-10 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700 font-bold ml-1 text-xs uppercase tracking-widest">{t('emailAddress')}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                required
                                className="rounded-xl border-slate-200 bg-white/50 focus:bg-white focus:ring-primary h-12 px-5 font-medium transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <Label htmlFor="password" className="text-slate-700 font-bold text-xs uppercase tracking-widest">{t('password')}</Label>
                                <Link href="#" className="text-[11px] font-bold text-primary hover:underline">¿La olvidaste?</Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="rounded-xl border-slate-200 bg-white/50 focus:bg-white focus:ring-primary h-12 px-5 font-medium transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-5 pt-2 pb-12 px-8 md:px-10">
                        <Button
                            type="submit"
                            className="w-full h-13 rounded-xl font-black text-base bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
                            disabled={loading}
                        >
                            {loading ? t('loading') : (
                                <>
                                    <span>Acceder</span>
                                    <Icons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>

                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100" />
                            </div>
                            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">
                                <span className="bg-white/0 px-4">{t('orContinueWith')}</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-13 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 text-slate-600 bg-white shadow-sm"
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.25.81-.59z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>Google</span>
                        </Button>

                        <p className="text-center text-slate-500 font-medium pt-2 text-xs">
                            {t('noAccount')}{" "}
                            <Link href="/auth/signup" className="text-primary hover:underline font-bold">
                                {t('signUp')}
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
