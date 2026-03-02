import { getUsers } from "@/lib/actions/users";
import { UsersTable } from "@/app/admin/users/users-table";
import { CreateUserDialog } from "./create-user-dialog";
import { Users, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Área - Navy Dark */}
            <div className="relative p-4 rounded-3xl bg-[#1E293B]/40 border border-white/5 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[8px] font-black uppercase tracking-widest">
                            <Users className="h-2.5 w-2.5 fill-current" />
                            Comunidad Scootix
                        </div>
                        <h1 className="text-xl font-extrabold text-[#F1F5F9] tracking-tighter">
                            Gestión de <span className="text-[#2563EB] italic">Usuarios</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#111827] px-4 py-2 rounded-2xl border border-white/5 text-center min-w-[90px] shadow-inner font-sans">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Registrados</p>
                            <p className="text-xl font-black text-[#F1F5F9] leading-none">{users.length}</p>
                        </div>
                        <CreateUserDialog />
                    </div>
                </div>
            </div>

            <UsersTable users={users} />
        </div>
    );
}
