export default function TestTailwindcss() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 space-y-6 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700 max-w-md mx-auto transform transition-all hover:scale-[1.02]">
            <div className="bg-indigo-500/10 p-4 rounded-full ring-4 ring-indigo-500/20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-cyan-400 select-none">
                Tailwind CSS 4.0
            </h1>

            <p className="text-slate-400 text-center leading-relaxed">
                Si puedes ver este diseño con bordes redondeados, gradientes y animaciones,
                <span className="text-indigo-400 font-semibold mx-1">Tailwind CSS</span>
                está correctamente configurado y funcionando.
            </p>

            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/30 transition-all active:scale-95 group flex items-center gap-2">
                <span>¡Funciona!</span>
                <span className="group-hover:translate-x-1 transition-transform">🚀</span>
            </button>

            <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
            </div>
        </div>
    );
}
