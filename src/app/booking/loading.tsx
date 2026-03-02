// loading.tsx - Booking loading skeleton
export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white animate-pulse px-4">
            <div className="w-full max-w-lg space-y-6">
                <div className="text-center space-y-3">
                    <div className="h-6 w-48 bg-slate-100 rounded-full mx-auto" />
                    <div className="h-4 w-72 bg-slate-100 rounded-full mx-auto" />
                </div>
                <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-5">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-24 bg-slate-100 rounded-full" />
                            <div className="h-12 bg-slate-100 rounded-xl" />
                        </div>
                    ))}
                    <div className="h-13 bg-slate-200 rounded-xl mt-4" />
                </div>
            </div>
        </div>
    );
}
