import { SidebarClassTrack } from "@/core/components/class-track/SidebarClass";
import { Outlet } from "react-router-dom";

export default function ClassTrackLayout() {
    const onSignOut = () => {
        //TODO: CERRAR SESION
    };

    return (
        <div className="flex min-h-screen bg-[var(--color-primary)]/10">
            <SidebarClassTrack onSignOut={onSignOut} />
            <main className="flex-1 overflow-y-auto min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}
