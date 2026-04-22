'use client';

import { alertStatus, sessionStatus, studentContractStatus, studentProgressCategory, type AlertStatus, type SessionStatus, type StudentContractStatus, type StudentProgressCategory } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import { useState, type UseState } from "@salc/core/features/shared/indentity/domain/entities";

//import { ContractStatus, ProgressCategory, SessionStatus, AlertStatus } from '@/lib/classtrack-types';

export function ProfileStatusBadge({ status }: { status: UseState }) {
    if (status === useState.ACTIVE) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-quinary)]">
                Activo
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
export function ContractStatusBadge({ status }: { status: StudentContractStatus }) {
    if (status === studentContractStatus.ACTIVE) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-quinary)]">
                Activo
            </span>
        );
    } else if (status === studentContractStatus.FROZEN) {
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

export function ProgressCategoryBadge({ category }: { category: StudentProgressCategory }) {
    if (category === studentProgressCategory.FAST) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quinary)] text-[var(--white)]">
                Avance Rapido
            </span>
        );
    } else if (category === studentProgressCategory.MODERATE) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-septenary)] text-[var(--white)]">
                Moderado
            </span>
        );
    } else if (category === studentProgressCategory.SLOW) {
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
    if (status === sessionStatus.IN_PROGRESS) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quinary)] text-[var(--white)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                En Curso
            </span>
        );
    } else if (status === sessionStatus.PENDING_APPROVAL) {
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

export function AlertStatusBadge({ alertStatusStudent }: { alertStatusStudent: AlertStatus }) {
    if (alertStatusStudent === alertStatus.PENDING) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quaternary)] text-[var(--white)]">
                Pendiente
            </span>
        );
    } else if (alertStatusStudent === alertStatus.RESOLVED) {
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
