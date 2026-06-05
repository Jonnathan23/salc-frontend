import { Outlet } from "react-router-dom";


export default function AuthLayout() {
    return (
        /* Added min-h-screen, bg-background, and text-foreground to mimic Next.js body behavior */
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">            
            <Outlet />
        </div>
    );
}