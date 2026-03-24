import { useAuthStore } from '@/features/indentity/application/store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';


export const PublicRoute = () => {
    const { isAuthenticated } = useAuthStore();

    // Si ya está autenticado y quiere entrar al login, lo redirigimos a su panel
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};