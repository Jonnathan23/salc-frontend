import AppLayout from "@/core/layouts/AppLayout";
import AuthLayout from "@/core/layouts/AuthLayout";
import DashboardPage from "@/core/pages/dasboard.page";
import { ProtectedRoute } from "@/core/routes/ProtectedRoute";
import { PublicRoute } from "@/core/routes/PublicRoute";
import LoginPage from "@/features/indentity/presentation/pages/login.page";
import RegisterPage from "@/features/indentity/presentation/pages/register.page";
import { systemPermissions } from "@salc/core/enums/Permissions";
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

                        <Route path="/" element={<DashboardPage />} />

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.SHARED_IDENTITY_WRITE]} />}>
                            <Route path="/new-user" element={<RegisterPage />} />
                        </Route>

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}