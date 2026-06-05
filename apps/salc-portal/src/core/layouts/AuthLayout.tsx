import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AuthSkeleton from "@/core/components/ui/skeletons/AuthSkeleton";

export default function AuthLayout() {
    return (
        /* Added min-h-screen, bg-background, and text-foreground to mimic Next.js body behavior */
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">            
            <Suspense fallback={<AuthSkeleton />}>
                <Outlet />
            </Suspense>
        </div>
    );
}