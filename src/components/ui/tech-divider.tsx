import { cn } from "@/lib/utils";

interface TechDividerProps {
    className?: string;
}

export function TechDivider({ className }: TechDividerProps) {
    return (
        <div className={cn("w-full relative flex items-center justify-center my-16 opacity-80", className)}>
            {/* Línea horizontal principal difuminada (clara) */}
            <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>

            {/* Elementos centrales oblicuos (Tech style) - Más finos y elegantes */}
            <div className="relative z-10 flex items-center justify-center gap-2 bg-white px-6">
                <div className="h-1 w-8 bg-primary/40 skew-x-[-45deg]" />
                <div className="h-1 w-3 bg-accent/40 skew-x-[-45deg]" />
                <div className="h-1 w-8 bg-primary/40 skew-x-[-45deg]" />
            </div>
        </div>
    );
}
