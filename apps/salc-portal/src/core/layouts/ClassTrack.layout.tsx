import { SidebarClassTrack } from "@/core/components/class-track/SidebarClass";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import ClassTrackSkeleton from "@/core/components/ui/skeletons/ClassTrackSkeleton";

export default function ClassTrackLayout() {
    const onSignOut = () => {
        //TODO: CERRAR SESION
    };

    return (
        <div className="flex min-h-screen bg-[var(--color-primary)]/10">
            <SidebarClassTrack onSignOut={onSignOut} />
            <main className="flex-1 overflow-y-auto min-h-screen">
                <Suspense fallback={<ClassTrackSkeleton />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
}
