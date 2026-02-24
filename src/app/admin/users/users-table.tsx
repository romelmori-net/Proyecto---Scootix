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
    ShieldAlert
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

export function UsersTable({ users }: { users: any[] }) {
    const { toast } = useToast();
    const router = useRouter();

    const handleUpdateRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
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
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Fecha Registro</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No hay usuarios registrados.
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name || "Sin nombre"}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleUpdateRole(user.id, user.role)}>
                                                {user.role === "ADMIN" ? (
                                                    <>
                                                        <User className="mr-2 h-4 w-4" /> Quitar Admin
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="mr-2 h-4 w-4" /> Promover a Admin
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Eliminar Usuario
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
