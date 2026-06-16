import { Outlet, Navigate } from "react-router-dom";
import { useSessionStudent } from "@/features/shared/verify/application/hooks/logic/useSessionStudent.hook";
import { useStudentSessionStore } from "@/core/store/studentSession.store";

export default function SessionStudentLayout() {
    const { isLoading, isError } = useSessionStudent();
    const { isAuthenticated, studentResponse } = useStudentSessionStore();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <span className="text-primary-foreground font-medium">Verificando sesión...</span>
            </div>
        );
    }

    if (isError) {
        return <Navigate to="/check-in" replace />;
    }

    if (isAuthenticated && studentResponse) {
        return (
            <>
                <Outlet />
            </>
        );
    }

    // Mientras el useEffect sincroniza la store
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
            <span className="text-primary-foreground font-medium">Iniciando sesión...</span>
        </div>
    );
}
