// loading.tsx - Contact loading skeleton
export default function Loading() {
    return (
        <div className="min-h-screen bg-white animate-pulse">
            <div className="bg-slate-900 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="h-5 w-40 bg-slate-700 rounded-full mx-auto" />
                    <div className="h-10 w-64 bg-slate-700 rounded-xl mx-auto" />
                    <div className="h-4 w-96 bg-slate-700 rounded-full mx-auto" />
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-16 bg-slate-100 rounded-2xl" />
                        ))}
                    </div>
                    <div className="lg:col-span-3">
                        <div className="bg-slate-100 rounded-3xl h-96" />
                    </div>
                </div>
            </div>
        </div>
    );
}
