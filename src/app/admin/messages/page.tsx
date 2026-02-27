import { getContactMessages } from "@/lib/actions/contact";
import { MessagesTable } from "./messages-table";
import { Mail, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function AdminMessagesPage() {
    const messages = await getContactMessages();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                            <Mail className="h-8 w-8" />
                        </div>
                        Bandeja de Entrada
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Gestiona las consultas y mensajes de tus clientes.</p>
                </div>
            </div>

            <MessagesTable messages={JSON.parse(JSON.stringify(messages))} />
        </div>
    );
}
