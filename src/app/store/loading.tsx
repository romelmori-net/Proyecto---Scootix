// loading.tsx - Store/Tienda loading skeleton
export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
            {/* Header */}
            <div className="mb-8 space-y-3">
                <div className="h-4 w-40 bg-slate-100 rounded-full" />
                <div className="h-9 w-64 bg-slate-100 rounded-xl" />
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-9 w-24 bg-slate-100 rounded-full" />
                ))}
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                        <div className="aspect-square bg-slate-100" />
                        <div className="p-4 space-y-2">
                            <div className="h-3 w-16 bg-slate-100 rounded-full" />
                            <div className="h-4 w-full bg-slate-100 rounded-full" />
                            <div className="h-5 w-20 bg-slate-100 rounded-full mt-3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
