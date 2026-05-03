import AppLayout from "@/core/layouts/AppLayout";
import AuthLayout from "@/core/layouts/AuthLayout";
import DashboardPage from "@/core/pages/dasboard.page";
import { ProtectedRoute } from "@/core/routes/ProtectedRoute";
import { PublicRoute } from "@/core/routes/PublicRoute";
import PlacementTestMockView from "@/features/contracts/prototype";
import LoginPage from "@/features/indentity/presentation/pages/login.page";
import RegisterPage from "@/features/indentity/presentation/pages/register.page";
import ModulePage from "@/features/modules/presentation/pages/module.page";
import DirectoryStudents from "@/features/students/presentation/pages/students-items/DirectoryStudents.page";
import StudentProfile from "@/features/students/presentation/pages/students-items/StudentProfile.page";
import TuitionStudentPage from "@/features/students/presentation/pages/TuitionStudent.page";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DirectoryProfilesPage from "@/features/indentity/presentation/pages/DirectoryProfiles.page";
import ViewProfilePage from "@/features/indentity/presentation/pages/ViewProfile.page";


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
                <Route path="/placement-test" element={<PlacementTestMockView />} />

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
                            <Route path="/view-students/:studentId/profile" element={<StudentProfile />} />
                        </Route>

                        <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_WRITE]} />}>
                            <Route path="/tuition-student" element={<TuitionStudentPage />} />
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