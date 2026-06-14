import WelcomeLayout from "@/core/layouts/Welcome.layout";
import NotFoundView from "@/core/pages/NotFound.page";
import CheckInPage from "@/features/attendance/presentation/pages/check-in/CheckIn.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
    //TODO: Crear la estructura de rutas protegidas y publicas por medio del JWT del studiante.
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFoundView />} />
                <Route>
                    <Route element={<WelcomeLayout />}>
                        <Route path="/check-in" element={<CheckInPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
