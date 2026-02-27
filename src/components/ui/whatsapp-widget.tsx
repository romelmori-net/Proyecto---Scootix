"use client";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function WhatsAppWidget() {
    const { t } = useLanguage();

    return (
        <div className="fixed bottom-6 right-6 z-[100] group animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-[#128C7E] text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl whitespace-nowrap border-2 border-white/20 backdrop-blur-sm">
                    ¿En qué podemos ayudarte?
                </div>
                <div className="w-3 h-3 bg-[#128C7E] rotate-45 absolute -bottom-1.5 right-6 border-r-2 border-b-2 border-white/20" />
            </div>

            {/* Float Button */}
            <button
                onClick={() => console.log("WhatsApp functionality pending...")}
                className={cn(
                    "w-16 h-16 rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.4)]",
                    "flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90",
                    "hover:shadow-[0_15px_60px_rgba(37,211,102,0.6)] relative overflow-hidden"
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 relative z-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.82 11.82 0 001.611 6.118L0 24l6.108-1.605a11.777 11.777 0 005.932 1.587h.005c6.635 0 12.05-5.414 12.053-12.053a11.82 11.82 0 00-3.418-8.475z" />
                </svg>

                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" />
            </button>
        </div>
    );
}
