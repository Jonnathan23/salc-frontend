import { lazy } from "react";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/features/shared/identity/presentation/routes/ProtectedRoute";
import { PublicRoute } from "@/features/shared/identity/presentation/routes/PublicRoute";
import AuthLayout from "@/core/layouts/AuthLayout";

import NotFoundView from "@/core/pages/NotFound.page";
import AdminDeskLayout from "@/core/layouts/AdminDesk.layout";
import IndexRedirect from "@/features/shared/identity/presentation/pages/IndexRedirect.page";
import ClassTrackLayout from "@/core/layouts/ClassTrack.layout";

const DirectoryStudents = lazy(
    () => import("@/features/admin-desk/students/presentation/pages/students-items/DirectoryStudents.page"),
);
const DirectoryProfilesPage = lazy(() => import("@/features/shared/identity/presentation/pages/DirectoryUsersProfiles.page"));
const ViewStudentProfile = lazy(() => import("@/features/admin-desk/students/presentation/pages/ViewStudentProfile.page"));
const TuitionStudentPage = lazy(() => import("@/features/admin-desk/students/presentation/pages/TuitionStudent.page"));
const ViewProfilePage = lazy(() => import("@/features/shared/identity/presentation/pages/ViewUser.page"));
const RegisterPage = lazy(() => import("@/features/shared/identity/presentation/pages/Register.page"));
const ModulePage = lazy(() => import("@/features/admin-desk/modules/presentation/pages/Module.page"));
const LoginPage = lazy(() => import("@/features/shared/identity/presentation/pages/Login.page"));
const DashboardAdminDeskPage = lazy(() => import("@/core/pages/DashboardAdminDesk.page"));
const DashboardClassTrackPage = lazy(
    () => import("@/features/class-track/dashboard/presentation/pages/DashboardClassTrack.page"),
);
const StudentLevelsPage = lazy(() => import("@/features/admin-desk/students-levels/presentation/pages/StudentLevels.page"));

// Class track
//const AccessControlView = lazy(() => import("@/features/class-track/attendance/presentation/pages/AccesControl.page"));
const AccessControlView = lazy(() => import("@/features/class-track/attendance/presentation/pages/AccesControl.page"));

export default function Router() {
    //TODO: redireccionar al login apenas se detecte que el JWT expiró

    return (
        <BrowserRouter>
            <Routes>
                {/* --- Ruta para 404 (fuera de AppLayout) --- */}
                <Route path="*" element={<NotFoundView />} />

                {/* --- ZONA PÚBLICA (Solo para visitantes) --- */}
                <Route element={<PublicRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/auth/Login" element={<LoginPage />} />
                    </Route>
                </Route>

                {/* --- ZONA PRIVADA (Solo para usuarios autenticados) --- */}
                <Route path="/" element={<IndexRedirect />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_MAIN_ACCESS]} />}>
                        <Route path="/admin-desk/" element={<AdminDeskLayout />}>
                            <Route path="dashboard" element={<DashboardAdminDeskPage />} />

                            {/* --- Rutas de Shared Identity --- */}
                            <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.SHARED_IDENTITY_WRITE]} />}>
                                <Route path="new-User" element={<RegisterPage />} />
                            </Route>

                            <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.SHARED_IDENTITY_READ]} />}>
                                <Route path="view-profiles" element={<DirectoryProfilesPage />} />
                            </Route>

                            <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.SHARED_IDENTITY_READ]} />}>
                                <Route path="view-profiles/:userId/profile" element={<ViewProfilePage />} />
                            </Route>

                            {/* --- Rutas de Students --- */}
                            <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_READ]} />}>
                                <Route path="view-students" element={<DirectoryStudents />} />
                            </Route>

                            <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_READ]} />}>
                                <Route path="view-students/:studentId/profile" element={<ViewStudentProfile />} />
                            </Route>

                            <Route
                                element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_STUDENTS_WRITE]} />}
                            >
                                <Route path="tuition-student" element={<TuitionStudentPage />} />
                            </Route>

                            {/* --- Rutas de Students-Levels --- */}
                            <Route
                                element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_CONTRACTS_READ]} />}
                            >
                                <Route path="students-levels" element={<StudentLevelsPage />} />
                            </Route>

                            {/* --- Rutas de Modules --- */}
                            <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.ADMINDESK_MODULES_READ]} />}>
                                <Route path="modules" element={<ModulePage />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoute requiredPermissions={[systemPermissions.CLASSTRACK_MAIN_ACCESS]} />}>
                        <Route path="/class-track/" element={<ClassTrackLayout />}>
                            <Route path="dashboard" element={<DashboardClassTrackPage />} />
                            <Route path="acces-control" element={<AccessControlView />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
