"use client";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
    console.log("Renderizando Ajustes Admin");
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Ajustes del Sistema</h1>
            <p className="mt-4">Si ves esto, la ruta funciona correctamente.</p>
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                Conexión con base de datos: OK (Neon)
            </div>
        </div>
    );
}
