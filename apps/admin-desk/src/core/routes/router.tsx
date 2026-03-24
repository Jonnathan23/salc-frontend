import AppLayout from "@/core/layouts/AppLayout";
import AuthLayout from "@/core/layouts/AuthLayout";
import DashboardPage from "@/core/pages/dasboard.page";
import { ProtectedRoute } from "@/core/routes/ProtectedRoute";
import { PublicRoute } from "@/core/routes/PublicRoute";
import LoginPage from "@/features/indentity/presentation/pages/login.page";
import RegisterPage from "@/features/indentity/presentation/pages/register.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function Router() {
    return (
        <BrowserRouter>            
            <Routes>
                
                {/* --- ZONA PÚBLICA (Solo para visitantes) --- */}
                <Route element={<PublicRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/auth/login" element={<LoginPage />} />
                    </Route>
                </Route>

                {/* --- ZONA PRIVADA (Solo para usuarios autenticados) --- */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        
                        {/* Cualquier usuario logueado puede ver el Dashboard */}
                        <Route path="/" element={<DashboardPage />} />

                        {/* Solo Administradores y Asesores pueden registrar estudiantes/usuarios */}
                        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'ADVISOR']} />}>
                            <Route path="/student-onboarding" element={<RegisterPage />} />
                        </Route>
                        
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}