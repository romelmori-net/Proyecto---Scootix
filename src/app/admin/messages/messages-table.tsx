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
    Trash2,
    Mail,
    Calendar,
    User,
    MoreVertical,
    MessageSquare,
    Eye,
    CheckCircle2,
    Clock
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { deleteContactMessage } from "@/lib/actions/contact";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function MessagesTable({ messages }: { messages: any[] }) {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este mensaje?")) return;

        const result = await deleteContactMessage(id);

        if (result.success) {
            toast({
                title: "Mensaje eliminado",
                description: "La consulta ha sido borrada correctamente.",
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
        <>
            <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-slate-100 hover:bg-transparent">
                            <TableHead className="py-5 pl-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Remitente</TableHead>
                            <TableHead className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Asunto</TableHead>
                            <TableHead className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Estado</TableHead>
                            <TableHead className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Fecha</TableHead>
                            <TableHead className="text-right py-5 pr-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center">
                                    <div className="flex flex-col items-center gap-4 opacity-20">
                                        <div className="p-6 rounded-full bg-slate-100">
                                            <Mail className="h-12 w-12 text-slate-400" />
                                        </div>
                                        <p className="font-black uppercase tracking-widest text-sm text-slate-500">Bandeja vacía</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            messages.map((msg) => (
                                <TableRow key={msg.id} className="border-slate-50 hover:bg-slate-50/50 transition-all duration-300 group cursor-pointer" onClick={() => setSelectedMessage(msg)}>
                                    <TableCell className="pl-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 leading-none mb-1">{msg.name}</span>
                                                <span className="text-xs text-slate-400 font-medium">{msg.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex flex-col max-w-[300px]">
                                            <span className="font-bold text-slate-800 line-clamp-1">{msg.subject}</span>
                                            <span className="text-xs text-slate-400 line-clamp-1 italic">"{msg.message}"</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest border-none",
                                                msg.status === "PENDING" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                            )}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                {msg.status === "PENDING" ? <Clock className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                                                {msg.status === "PENDING" ? "Pendiente" : "Leído"}
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-tighter">
                                            <Calendar className="h-4 w-4 text-slate-300" />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-8 py-5">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-lg border-none transition-all">
                                                    <MoreVertical className="h-5 w-5 text-slate-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-2xl border-slate-100 p-2">
                                                <DropdownMenuItem
                                                    onClick={(e) => { e.stopPropagation(); setSelectedMessage(msg); }}
                                                    className="rounded-xl cursor-pointer py-3 flex items-center gap-3"
                                                >
                                                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                        <Eye className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <span className="font-bold text-slate-900">Ver Detalles</span>
                                                </DropdownMenuItem>

                                                <div className="h-px bg-slate-50 my-2 mx-1" />
                                                <DropdownMenuItem
                                                    className="text-red-600 rounded-xl cursor-pointer py-3 flex items-center gap-3 focus:bg-red-50 focus:text-red-600"
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                                >
                                                    <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </div>
                                                    <span className="font-bold">Eliminar</span>
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

            {/* Message Detail Dialog */}
            <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
                <DialogContent className="max-w-2xl rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-slate-50/50">
                    <DialogHeader className="p-8 bg-white border-b border-slate-100 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10" />
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <MessageSquare className="h-7 w-7" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Detalle de Consulta</DialogTitle>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">ID: {selectedMessage?.id}</p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Remitente</p>
                                <p className="font-bold text-slate-900">{selectedMessage?.name}</p>
                                <p className="text-sm text-slate-500 font-medium">{selectedMessage?.email}</p>
                            </div>
                            <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Fecha de Envío</p>
                                <p className="font-bold text-slate-900">
                                    {selectedMessage && new Date(selectedMessage.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Asunto</p>
                                <p className="text-lg font-black text-slate-900">{selectedMessage?.subject}</p>
                            </div>
                            <div className="h-px bg-slate-50" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Mensaje</p>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {selectedMessage?.message}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" className="h-12 px-8 rounded-xl font-bold" onClick={() => setSelectedMessage(null)}>
                                Cerrar
                            </Button>
                            <Button className="h-12 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                                <a href={`mailto:${selectedMessage?.email}?subject=Re: ${selectedMessage?.subject}`}>
                                    Responder por Email
                                </a>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
