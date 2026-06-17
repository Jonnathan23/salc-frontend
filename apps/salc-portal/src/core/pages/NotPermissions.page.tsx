import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { AlertCircle } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function NotPermissionsView() {
    const navigate = useNavigate();

    const onNavigateToHome = () => {
        localStorage.removeItem("auth-storage");
        // eslint-disable-next-line unicorn/no-document-cookie
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/auth/Login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-background">
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-2xl">
                {/* Icon */}
                <div className="mb-8">
                    <div className="relative">
                        <AlertCircle size={120} strokeWidth={1} className="text-title" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-9xl font-black mb-4 leading-tight">401</h1>

                {/* Main Title */}
                <h2 className="text-4xl font-bold mb-4">Sin Permisos</h2>

                {/* Subtitle/Description */}
                <p className="text-lg text-foreground mb-2 leading-relaxed">No tienes permisos para acceder a ningún módulo.</p>

                <p className="text-base text-muted-foreground mb-10">
                    Contacta a un administrador para que te asigne los permisos correspondientes.
                </p>

                {/* CTA Button */}
                <Button
                    onClick={onNavigateToHome}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                >
                    Intetar nuevamente
                </Button>
            </div>
        </div>
    );
}
