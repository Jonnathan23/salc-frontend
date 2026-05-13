import DirectoryStudents from "@/features/students/presentation/pages/students-items/DirectoryStudents.page";
import DirectoryProfilesPage from "@/features/indentity/presentation/pages/DirectoryUsersProfiles.page";
import ViewStudentProfile from "@/features/students/presentation/pages/ViewStudentProfile.page";
import TuitionStudentPage from "@/features/students/presentation/pages/TuitionStudent.page";
import ViewProfilePage from "@/features/indentity/presentation/pages/ViewUser.page";
import RegisterPage from "@/features/indentity/presentation/pages/register.page";
import ModulePage from "@/features/modules/presentation/pages/module.page";
import LoginPage from "@/features/indentity/presentation/pages/login.page";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/core/routes/ProtectedRoute";
import { PublicRoute } from "@/core/routes/PublicRoute";
import DashboardPage from "@/core/pages/dasboard.page";
import AuthLayout from "@/core/layouts/AuthLayout";
import AppLayout from "@/core/layouts/AppLayout";
import StudentLevelsPage from "@/features/students-levels/presentation/pages/studentLevels.page";


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

                        {/* --- Rutas de Shared Identity --- */}
                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.SHARED_IDENTITY_WRITE]} />}>
                            <Route path="/new-user" element={<RegisterPage />} />
                        </Route>

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.SHARED_IDENTITY_READ]} />}>
                            <Route path="/view-profiles" element={<DirectoryProfilesPage />} />
                        </Route>

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.SHARED_IDENTITY_READ]} />}>
                            <Route path="/view-profiles/:userId/profile" element={<ViewProfilePage />} />
                        </Route>

                        {/* --- Rutas de Students --- */}
                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_READ]} />}>
                            <Route path="/view-students" element={<DirectoryStudents />} />
                        </Route>

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_READ]} />}>
                            <Route path="/view-students/:studentId/profile" element={<ViewStudentProfile />} />
                        </Route>

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_WRITE]} />}>
                            <Route path="/tuition-student" element={<TuitionStudentPage />} />
                        </Route>

                        {/* --- Rutas de Students-Levels --- */}
                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_CONTRACTS_READ]} />}>
                            <Route path="/students-levels" element={<StudentLevelsPage />} />
                        </Route>

                        {/* --- Rutas de Modules --- */}
                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_MODULES_READ]} />}>
                            <Route path="/modules" element={<ModulePage />} />
                        </Route>

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}