import AppLayout from "@/core/layouts/AppLayout";
import AuthLayout from "@/core/layouts/AuthLayout";
import DashboardPage from "@/core/pages/dasboard.page";
import { ProtectedRoute } from "@/core/routes/ProtectedRoute";
import { PublicRoute } from "@/core/routes/PublicRoute";
import LoginPage from "@/features/indentity/presentation/pages/login.page";
import RegisterPage from "@/features/indentity/presentation/pages/register.page";
import ModulePage from "@/features/modules/presentation/pages/module.page";
import TuitionStudentPage from "@/features/students/presentation/pages/TuitionStudent.page";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function Router() {

    //TODO: redireccionar al login apenas se detecte que el JWT expiró

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

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_MODULES_READ]} />}>
                            <Route path="/modules" element={<ModulePage />} />
                        </Route>

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_WRITE]} />}>
                            <Route path="/tuition-student" element={<TuitionStudentPage />} />
                        </Route>

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}