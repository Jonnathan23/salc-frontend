import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // Asegúrate de importar el Link de tu librería de enrutamiento

export default function NotFoundView() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-background">
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-2xl">
                {/* Icon */}
                <div className="mb-8">
                    <div className="relative">
                        <AlertCircle
                            size={120}
                            strokeWidth={1}
                            className="text-title"
                        />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-9xl font-black mb-4 leading-tight">
                    404
                </h1>

                {/* Main Title */}
                <h2 className="text-4xl font-bold mb-4">
                    Página no encontrada
                </h2>

                {/* Subtitle/Description */}
                <p className="text-lg text-foreground mb-2 leading-relaxed">
                    Parece que te has salido del plan de estudios. La página que buscas
                    no existe o ha sido movida.
                </p>

                <p className="text-base text-muted-foreground mb-10">
                    No te preocupes, podemos ayudarte a encontrar lo que necesitas.
                </p>

                {/* CTA Button */}
                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                >
                    Volver al Inicio
                </Link>

                {/* Additional Helpful Links 
                <div className="mt-12 flex gap-4 text-sm">
                    <Link
                        to="/"
                        className="text-primary hover:opacity-80 font-medium transition-colors"
                    >
                        Inicio
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                        to="/contacto"
                        className="text-primary hover:opacity-80 font-medium transition-colors"
                    >
                        Contacto
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                        to="/ayuda"
                        className="text-primary hover:opacity-80 font-medium transition-colors"
                    >
                        Ayuda
                    </Link>
                </div>
                */}
            </div>
        </div>
    );
}