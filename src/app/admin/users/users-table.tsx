"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    ShieldCheck,
    User,
    Trash2,
    ShieldAlert,
    Mail,
    Calendar,
    BadgeCheck,
    MoreVertical
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { updateUserRole, deleteUser } from "@/lib/actions/users";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function UsersTable({ users }: { users: any[] }) {
    const { toast } = useToast();
    const router = useRouter();

    const handleUpdateRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === "ADMIN" ? "CUSTOMER" : "ADMIN";
        const result = await updateUserRole(userId, newRole);

        if (result.success) {
            toast({
                title: "Rol actualizado",
                description: `El usuario ahora tiene el rol de ${newRole}.`,
            });
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

        const result = await deleteUser(userId);

        if (result.success) {
            toast({
                title: "Usuario eliminado",
                description: "El usuario ha sido borrado del sistema correctamente.",
            });
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="rounded-3xl border border-white/5 bg-[#1E293B]/30 backdrop-blur-md overflow-hidden shadow-2xl">
            <Table>
                <TableHeader className="bg-[#111827]/50 border-b border-white/5">
                    <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="py-4 pl-6 text-[10px] font-black uppercase text-slate-500 tracking-widest h-12">Usuario</TableHead>
                        <TableHead className="py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest h-12">Contacto</TableHead>
                        <TableHead className="py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest h-12">Rol</TableHead>
                        <TableHead className="py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest h-12">Miembro desde</TableHead>
                        <TableHead className="text-right py-4 pr-6 text-[10px] font-black uppercase text-slate-500 tracking-widest h-12">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-slate-500 font-bold uppercase tracking-widest text-xs">
                                <div className="flex flex-col items-center gap-3">
                                    <User className="h-10 w-10 opacity-10" />
                                    <p>No hay usuarios registrados</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id} className="border-white/5 hover:bg-[#2563EB]/5 transition-colors group">
                                <TableCell className="pl-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-[#111827] flex items-center justify-center border border-white/5 shadow-sm overflow-hidden group-hover:border-[#2563EB]/40 transition-all">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <User className="h-5 w-5 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#F1F5F9] text-sm leading-tight group-hover:text-[#2563EB] transition-colors">{user.name || "Sin nombre"}</span>
                                            <span className="text-[7px] text-slate-500 uppercase tracking-wider font-black">ID: {user.id.substring(0, 8)}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Mail className="h-3.5 w-3.5 opacity-40" />
                                        <span className="text-xs font-medium">{user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Badge
                                        variant="secondary"
                                        className={cn(
                                            "rounded-lg px-2 py-0.5 font-black text-[7px] uppercase tracking-wider border-none",
                                            user.role === "ADMIN"
                                                ? "bg-[#2563EB]/10 text-[#2563EB]"
                                                : "bg-[#111827] text-slate-500"
                                        )}
                                    >
                                        {user.role === "ADMIN" && <BadgeCheck className="h-3 w-3 mr-1 inline-block" />}
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                                        <Calendar className="h-3.5 w-3.5 opacity-30" />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 bg-[#111827] text-white hover:bg-[#2563EB]/10 transition-all">
                                                <MoreVertical className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border-white/10 bg-[#111827] text-[#F1F5F9] p-2 animate-in slide-in-from-top-2 duration-300 backdrop-blur-xl">
                                            <div className="px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Privilegios</div>
                                            <DropdownMenuItem
                                                onClick={() => handleUpdateRole(user.id, user.role)}
                                                className="rounded-xl cursor-pointer py-2 px-3 flex items-center gap-3 hover:bg-[#2563EB]/10 transition-colors"
                                            >
                                                {user.role === "ADMIN" ? (
                                                    <>
                                                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                                            <User className="h-4 w-4 text-blue-400" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-xs">Quitar Admin</span>
                                                            <span className="text-[8px] text-slate-500 font-medium border-none leading-none mt-1">Nivel: Cliente</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="h-8 w-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center border border-[#2563EB]/20">
                                                            <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-xs">Promover a Admin</span>
                                                            <span className="text-[8px] text-slate-500 font-medium border-none leading-none mt-1">Control maestro</span>
                                                        </div>
                                                    </>
                                                )}
                                            </DropdownMenuItem>

                                            <div className="h-px bg-white/5 my-2 mx-1" />
                                            <div className="px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Precaución</div>
                                            <DropdownMenuItem
                                                className="text-[#EF4444] rounded-xl cursor-pointer py-2 px-3 flex items-center gap-3 hover:bg-[#EF4444]/10 transition-colors"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <div className="h-8 w-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center border border-[#EF4444]/20">
                                                    <Trash2 className="h-4 w-4 text-[#EF4444]" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-xs border-none">Eliminar</span>
                                                    <span className="text-[8px] opacity-70 font-medium border-none font-black uppercase leading-none mt-1">Acción Terminal</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
