import AppLayout from "@/core/layouts/AppLayout";
import AuthLayout from "@/core/layouts/AuthLayout";
import DashboardPage from "@/core/pages/dasboard.page";
import LoginPage from "@/features/indentity/presentation/pages/login.page";
import RegisterPage from "@/features/indentity/presentation/pages/register.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Routes>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}