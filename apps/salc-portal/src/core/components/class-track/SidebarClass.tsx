"use client";

import { classTrackNavItems } from "@/core/data/navItemsClassTrack";
import type { ClassTrackNavItem } from "@/core/interfaces/NavItem";
import { MonitorPlay } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@salc/ui/lib/utils";

interface SidebarProps {
    readonly onSignOut: () => void;
}

interface NavItemComponentProps {
    readonly item: ClassTrackNavItem;
    readonly pathname: string;
}

function NavItemComponent({ item, pathname }: NavItemComponentProps) {
    const { label, icon, href } = item;
    const IconComponent = icon;
    const isActive = pathname === href;

    return (
        <Link
            to={href}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left",
                isActive
                    ? "bg-[var(--color-septenary)] text-[var(--white)] shadow-sm"
                    : "text-[var(--color-primary)]/80 hover:bg-[var(--color-septenary)]/40 hover:text-[var(--white)]",
            )}
        >
            <span className={cn(isActive ? "text-[var(--white)]" : "text-[var(--color-primary)]/70")}>
                <IconComponent className="w-4 h-4" />
            </span>
            {label}
        </Link>
    );
}

export function SidebarClassTrack({ onSignOut }: SidebarProps) {
    const { pathname } = useLocation();

    return (
        <aside className="w-64 min-h-screen flex flex-col bg-[var(--color-quinary)] text-[var(--white)]">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-[var(--color-septenary)]/40">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-font-title)] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CT</span>
                    </div>
                    <div>
                        <p className="font-bold text-[var(--white)] text-base leading-none">ClassTrack</p>
                        <p className="text-[var(--color-primary)] text-xs mt-0.5">Panel Administrativo</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                <p className="text-[var(--color-primary)]/60 text-[10px] font-semibold uppercase tracking-widest px-3 pb-2">
                    Modulos
                </p>
                {classTrackNavItems.map((item) => (
                    <NavItemComponent key={item.view} pathname={pathname} item={item} />
                ))}
            </nav>

            {/* Kiosk Switch */}
            <div className="px-3 pb-4">
                <div className="border-t border-[var(--color-septenary)]/40 pt-4">
                    <button
                        onClick={onSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-[var(--color-primary)]/80 hover:bg-[var(--color-septenary)]/40 hover:text-[var(--white)]"
                    >
                        <MonitorPlay className="w-4 h-4 text-[var(--color-font-title)]" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </aside>
    );
}
