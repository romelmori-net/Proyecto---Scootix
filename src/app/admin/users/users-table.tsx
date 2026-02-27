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
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-slate-100 hover:bg-transparent">
                        <TableHead className="py-4 pl-6 text-xs font-black uppercase text-slate-500 tracking-widest">Usuario</TableHead>
                        <TableHead className="py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Contacto</TableHead>
                        <TableHead className="py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Rol</TableHead>
                        <TableHead className="py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Miembro desde</TableHead>
                        <TableHead className="text-right py-4 pr-6 text-xs font-black uppercase text-slate-500 tracking-widest">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-slate-400">
                                <div className="flex flex-col items-center gap-3">
                                    <User className="h-10 w-10 opacity-20" />
                                    <p className="font-medium">No hay usuarios registrados</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                <TableCell className="pl-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden bg-gradient-to-br from-slate-50 to-slate-200">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <User className="h-5 w-5 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 leading-none mb-1">{user.name || "Sin nombre"}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-black">ID: {user.id.substring(0, 8)}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Mail className="h-4 w-4 text-slate-300" />
                                        <span className="text-sm font-medium">{user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Badge
                                        variant="secondary"
                                        className={cn(
                                            "rounded-lg px-2.5 py-1 font-black text-[10px] uppercase tracking-wider border-none",
                                            user.role === "ADMIN"
                                                ? "bg-primary/10 text-primary"
                                                : "bg-blue-50 text-blue-600"
                                        )}
                                    >
                                        {user.role === "ADMIN" && <BadgeCheck className="h-3 w-3 mr-1 inline-block" />}
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                        <Calendar className="h-4 w-4 text-slate-300" />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm border-none">
                                                <MoreVertical className="h-5 w-5 text-slate-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border-slate-100 p-2">
                                            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Privilegios</div>
                                            <DropdownMenuItem
                                                onClick={() => handleUpdateRole(user.id, user.role)}
                                                className="rounded-xl cursor-pointer py-2.5 flex items-center gap-3"
                                            >
                                                {user.role === "ADMIN" ? (
                                                    <>
                                                        <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                            <User className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-900 border-none">Quitar Admin</span>
                                                            <span className="text-[10px] text-slate-400 font-medium border-none">Asignar rol de cliente</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                            <ShieldCheck className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-900 border-none">Promover a Admin</span>
                                                            <span className="text-[10px] text-slate-400 font-medium border-none">Control total del sistema</span>
                                                        </div>
                                                    </>
                                                )}
                                            </DropdownMenuItem>

                                            <div className="h-px bg-slate-50 my-2 mx-1" />
                                            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Precaución</div>
                                            <DropdownMenuItem
                                                className="text-red-600 rounded-xl cursor-pointer py-2.5 px-3 flex items-center gap-3 focus:bg-red-50 focus:text-red-600"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center">
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold border-none">Eliminar Usuario</span>
                                                    <span className="text-[10px] opacity-70 font-medium border-none font-black uppercase">Acción irreversible</span>
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
