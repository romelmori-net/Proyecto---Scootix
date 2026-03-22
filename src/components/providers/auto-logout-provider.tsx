"use client";

import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

// Tiempo de inactividad antes de cerrar sesión: 12 minutos
const TIMEOUT_MS = 12 * 60 * 1000;

export function AutoLogoutProvider({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const pathname = usePathname();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Función para reiniciar el temporizador si hay actividad
        const resetTimer = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Solo iniciar temporizador si el usuario está autenticado
            if (status === "authenticated") {
                timerRef.current = setTimeout(() => {
                    // Hacer logout al alcanzar el tiempo máximo de inactividad designado
                    console.log("Sesión cerrada por inactividad de más de 12 minutos.");
                    signOut({ callbackUrl: "/auth/signin?timeout=true" });
                }, TIMEOUT_MS);
            }
        };

        // Ejecutar inicialmente el reset timer
        resetTimer();

        // Lista de eventos del mouse, teclado y pantalla táctil que determinan actividad
        const events = [
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress",
            "touchstart",
        ];

        // Usamos una variable auxiliar para no saturar de listener reseteos
        let timeoutBouncer: NodeJS.Timeout | null = null;
        const handleActivity = () => {
             if (timeoutBouncer) return;
             // Un pequeño retraso para no llamar a resetTimer cientos de veces por segundo durante el scroll/movimiento
             timeoutBouncer = setTimeout(() => {
                 timeoutBouncer = null;
                 resetTimer();
             }, 1000);
        };

        // Solo nos interesa monitorear y reiniciar el timer si el usuario ya inició sesión
        if (status === "authenticated") {
            events.forEach((event) => {
                window.addEventListener(event, handleActivity, { passive: true });
            });
        }

        // Cleanup al desmontar o al cambiar de página
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (timeoutBouncer) clearTimeout(timeoutBouncer);
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [status, pathname]); // Re-ejecutar si el estado de login cambia o el usuario navega a otra ruta

    return <>{children}</>;
}
