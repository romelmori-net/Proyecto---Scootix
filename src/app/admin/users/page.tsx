import { getUsers } from "@/lib/actions/users";
import { UsersTable } from "@/app/admin/users/users-table";
import { CreateUserDialog } from "./create-user-dialog";

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-muted-foreground">Administra los usuarios registrados y sus permisos en el sistema.</p>
                </div>
                <CreateUserDialog />
            </div>

            <UsersTable users={users} />
        </div>
    );
}
