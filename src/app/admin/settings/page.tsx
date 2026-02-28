"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Save, Database, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Ajustes del Sistema</h1>
                <p className="text-muted-foreground">Configura los parámetros globales de Scootix PRO.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-black">
                            <Database className="h-5 w-5 text-primary" /> Configuracion de Base de Datos
                        </CardTitle>
                        <CardDescription>Estado de la conexión y parámetros de Neon.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Base de Datos</Label>
                            <Input value="Neon PostgreSQL (Producción)" disabled className="bg-slate-50 font-medium" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Estado</Label>
                            <div className="flex items-center gap-2 text-green-600 font-bold p-2 bg-green-50 rounded-lg border border-green-100">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                Conectado y Operativo
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-black">
                            <Shield className="h-5 w-5 text-primary" /> Seguridad Administrativa
                        </CardTitle>
                        <CardDescription>Control de acceso y variables de entorno.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Emails de Administradores</Label>
                            <Input value={process.env.ADMIN_EMAILS || "romelmori81@gmail.com"} disabled className="bg-slate-50 font-medium" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Proveedor de Sesiones</Label>
                            <Input value="NextAuth.js (JWT Strategy)" disabled className="bg-slate-50 font-medium" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-black">
                        <SettingsIcon className="h-5 w-5 text-primary" /> Preferencias Generales
                    </CardTitle>
                    <CardDescription>Configuración básica de la tienda y el panel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="store-name">Nombre de la Tienda</Label>
                            <Input id="store-name" defaultValue="Scootix" className="rounded-xl h-12" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="support-email">Email de Soporte</Label>
                            <Input id="support-email" defaultValue="soporte@scootix.com" className="rounded-xl h-12" />
                        </div>
                    </div>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end">
                    <Button className="rounded-xl px-8 h-12 font-black shadow-lg hover:shadow-primary/20 transition-all">
                        <Save className="mr-2 h-4 w-4" /> Guardar Ajustes
                    </Button>
                </div>
            </Card>
        </div>
    );
}
