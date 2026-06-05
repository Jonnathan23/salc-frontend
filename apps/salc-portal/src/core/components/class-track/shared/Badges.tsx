'use client';

import { ContractStatus, ProgressCategory, SessionStatus, AlertStatus } from '@/lib/classtrack-types';

export function ContractStatusBadge({ status }: { status: ContractStatus }) {
    if (status === ContractStatus.ACTIVE) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-quinary)]">
                Activo
            </span>
        );
    } else if (status === ContractStatus.FROZEN) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-tertiary)] text-[var(--color-font)]">
                Congelado
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quaternary)] text-[var(--white)]">
                Inactivo
            </span>
        );
    }
}

export function ProgressCategoryBadge({ category }: { category: ProgressCategory }) {
    if (category === ProgressCategory.FAST) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quinary)] text-[var(--white)]">
                Avance Rapido
            </span>
        );
    } else if (category === ProgressCategory.MODERATE) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-septenary)] text-[var(--white)]">
                Moderado
            </span>
        );
    } else if (category === ProgressCategory.SLOW) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-sextary)] text-[var(--white)]">
                Lento
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-tertiary)] text-[var(--color-font)]">
                Sin Datos
            </span>
        );
    }
}

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
    if (status === SessionStatus.IN_PROGRESS) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quinary)] text-[var(--white)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                En Curso
            </span>
        );
    } else if (status === SessionStatus.PENDING_APPROVAL) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-sextary)] text-[var(--white)]">
                Pendiente Aprobacion
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-tertiary)] text-[var(--color-font)]">
                Aprobado
            </span>
        );
    }
}

export function AlertStatusBadge({ alertStatus }: { alertStatus: AlertStatus }) {
    if (alertStatus === AlertStatus.PENDING) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quaternary)] text-[var(--white)]">
                Pendiente
            </span>
        );
    } else if (alertStatus === AlertStatus.RESOLVED) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-font)]">
                Resuelto
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                Cerrado / Congelado
            </span>
        );
    }
}
