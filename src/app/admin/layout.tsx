import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="flex bg-[#0F172A] h-screen overflow-hidden dark font-sans scrollbar-hide">
            <Sidebar />
            <main className="flex-1 px-8 pt-16 pb-8 overflow-y-auto scrollbar-hide bg-[#0F172A]">
                <div className="max-w-full mx-auto pb-32">
                    {children}
                </div>
            </main>
        </div>
    );
}
