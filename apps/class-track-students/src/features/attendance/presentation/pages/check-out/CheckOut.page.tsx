import { LogOut } from "lucide-react";

export default function CheckOutPage() {
    return (
        <>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
                {/* Greeting */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-quinary)] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">{"A"}</span>
                    </div>
                    <div>
                        <p className="text-[var(--color-font)]/50 text-sm">Bienvenido/a de nuevo</p>
                        <h2 className="text-xl font-bold text-[var(--color-font)]">Hola, Bienvenido</h2>
                        <p className="text-[var(--color-font)]/50 text-xs mt-0.5">
                            Entrada registrada a las {/**TODO: Colocar tiempo de entrada */} AM
                        </p>
                    </div>
                </div>

                {/* Lessons dropdown */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-[var(--color-font)] mb-2">Lecciones estudiadas hoy</label>
                    <select
                        onChange={() => {}}
                        className="w-full px-4 py-3.5 border-2 border-[var(--color-tertiary)]/40 rounded-xl text-[var(--color-font)] font-medium focus:outline-none focus:border-[var(--color-quinary)] transition-colors appearance-none bg-white"
                    >
                        <option value={1}>1 leccion (14)</option>
                        <option value={2}>2 lecciones (14 y 15)</option>
                        <option value={3}>3 lecciones (14, 15 y 16)</option>
                    </select>
                </div>

                {/* Check-out Button */}
                <button
                    onClick={handleCheckOut}
                    className="w-full py-4 rounded-xl font-bold text-base text-white transition-all flex items-center justify-center gap-2"
                    style={{ background: "var(--color-quinary)" }}
                >
                    <LogOut className="w-5 h-5" />
                    Solicitar Salida
                </button>
                <p className="text-center text-[var(--color-font)]/40 text-xs mt-3">Tu salida sera revisada por un instructor</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="flex bg-white/10 p-1 rounded-xl gap-1">
                    <button
                        onClick={() => {}}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${"bg-white text-[var(--color-quinary)] shadow-sm"}`}
                    >
                        <LogOut className="w-4 h-4" />
                        Salida
                    </button>
                </div>
            </div>
        </>
    );
}
