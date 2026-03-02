"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { createUser } from "@/lib/actions/users";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CreateUserDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await createUser(formData);

        if (result.success) {
            toast({
                title: "Usuario creado",
                description: `El usuario ${formData.email} se ha creado correctamente.`,
            });
            setOpen(false);
            setFormData({ name: "", email: "", password: "", role: "USER" });
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-none rounded-xl h-11 px-6 font-black uppercase text-[10px] tracking-widest transition-all">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#111827] border-white/10 text-[#F1F5F9] rounded-[2rem] shadow-2xl backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black tracking-tight">Crear Nuevo Usuario</DialogTitle>
                    <DialogDescription className="text-slate-500 text-xs font-medium">
                        Añade un nuevo administrador o cliente al sistema.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nombre</Label>
                            <Input
                                id="name"
                                placeholder="Ej: Juan Pérez"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-[#1E293B]/60 border-white/5 text-white placeholder:text-slate-600 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/40 rounded-xl h-11 px-4"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="usuario@scootix.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-[#1E293B]/60 border-white/5 text-white placeholder:text-slate-600 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/40 rounded-xl h-11 px-4"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contraseña Temporal</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="bg-[#1E293B]/60 border-white/5 text-white focus:ring-[#2563EB]/20 focus:border-[#2563EB]/40 rounded-xl h-11 px-4"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rol del Sistema</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) => setFormData({ ...formData, role: value })}
                            >
                                <SelectTrigger className="bg-[#1E293B]/60 border-white/5 text-white focus:ring-[#2563EB]/20 focus:border-[#2563EB]/40 rounded-xl h-11 px-4">
                                    <SelectValue placeholder="Selecciona un rol" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#111827] border-white/10 text-white">
                                    <SelectItem value="USER">CLIENTE (User)</SelectItem>
                                    <SelectItem value="ADMIN">ADMINISTRADOR</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="pt-2">
                        <Button type="submit" disabled={loading} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-none rounded-xl h-12 font-black uppercase text-xs tracking-widest transition-all">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Crear Usuario
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
