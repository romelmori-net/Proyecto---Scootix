// loading.tsx - Global client loading skeleton
export default function Loading() {
    return (
        <div className="min-h-screen bg-white animate-pulse">
            {/* Hero skeleton */}
            <div className="w-full h-[520px] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-shimmer" />
                <div className="absolute bottom-12 left-8 md:left-16 space-y-4">
                    <div className="h-3 w-32 bg-slate-200 rounded-full" />
                    <div className="h-10 w-80 bg-slate-200 rounded-xl" />
                    <div className="h-10 w-64 bg-slate-200 rounded-xl" />
                    <div className="h-5 w-96 bg-slate-200 rounded-full mt-4" />
                    <div className="flex gap-3 mt-6">
                        <div className="h-12 w-36 bg-slate-200 rounded-full" />
                        <div className="h-12 w-36 bg-slate-200 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Cards skeleton */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-40 bg-slate-100 rounded-3xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
