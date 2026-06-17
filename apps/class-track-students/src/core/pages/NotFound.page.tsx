import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundView() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-background">
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-2xl">
                <div className="mb-8">
                    <div className="relative">
                        <AlertCircle size={120} strokeWidth={1} className="text-title" />
                    </div>
                </div>

                <h1 className="text-9xl font-black mb-4 leading-tight">404</h1>

                <h2 className="text-4xl font-bold mb-4">Página no encontrada</h2>

                <p className="text-lg text-foreground mb-2 leading-relaxed">
                    ¡Ups! Parece que te has salido de la página. La página que buscas no existe o ha sido movida.
                </p>

                <p className="text-base text-muted-foreground mb-10">
                    No te preocupes, podemos ayudarte a encontrar lo que necesitas.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
