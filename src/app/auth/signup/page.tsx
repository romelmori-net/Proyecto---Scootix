"use client";

import { useState } from "react";
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

export default function SignUpPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error al registrarse");
            }

            toast({
                title: "¡Bienvenido a Scootix!",
                description: "Tu cuenta ha sido creada con los más altos estándares de seguridad.",
            });

            router.push("/auth/signin");
        } catch (error: any) {
            toast({
                title: "Error de Registro",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 md:p-10 overflow-hidden bg-slate-50">
            {/* Background avec overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80"
                    alt="Register Background"
                    fill
                    className="object-cover opacity-10 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-slate-100/50" />
            </div>

            <Card className="relative z-10 w-full max-w-[460px] border border-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-white/90 backdrop-blur-2xl overflow-hidden mx-auto">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

                <CardHeader className="space-y-3 pt-12 pb-6 text-center px-8">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                        <Icons.UserPlus className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">
                            {t('signUp')}
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium text-base">
                            Únete a la comunidad de <span className="text-primary font-bold">Scootix</span>
                        </CardDescription>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-5 px-8 md:px-10 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-700 font-bold ml-1 text-xs uppercase tracking-widest">{t('fullName')}</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Juan Pérez"
                                required
                                className="rounded-xl border-slate-200 bg-white/50 focus:bg-white focus:ring-primary h-12 px-5 font-medium transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
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
                            <Label htmlFor="password" title="Mínimo 8 caracteres" className="text-slate-700 font-bold ml-1 text-xs uppercase tracking-widest flex items-center justify-between">
                                {t('password')}
                                <span className="text-[9px] text-slate-400 font-black tracking-tighter">MÍN. 8 CARACT.</span>
                            </Label>
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
                                    <span>{t('signUp')}</span>
                                    <Icons.Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                </>
                            )}
                        </Button>

                        <p className="text-center text-slate-500 font-medium pt-2 text-xs leading-relaxed">
                            {t('alreadyHaveAccount')}{" "}
                            <br />
                            <Link href="/auth/signin" className="text-primary hover:underline font-bold">
                                {t('signIn')}
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
