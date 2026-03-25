import { useAuthStore } from '@/features/indentity/application/store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';



interface ProtectedRouteProps {
    allowedRoles?: Array<string>;
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, userResponse } = useAuthStore();

    // 1. Si no hay sesión, lo expulsamos al login
    if (!isAuthenticated || !userResponse) {
        return <Navigate to="/auth/login" replace />;
    }

    // 2. Validación de Roles (RBAC). Si la ruta exige roles y el usuario no los tiene
    if (allowedRoles && !allowedRoles.includes(userResponse.us_role)) {
        // Lo devolvemos al inicio (o puedes enviarlo a una vista de "No Autorizado")
        return <Navigate to="/" replace />; 
    }

    // 3. Todo está en orden, renderizamos la ruta hija
    return <Outlet />;
};