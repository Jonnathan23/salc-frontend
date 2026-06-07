"use client";

import {
    studentContractStatus,
    studentProgressCategory,
    type StudentContractStatus,
    type StudentProgressCategory,
} from "@salc/core/features/admin-desk/students/domain/interfaces";

import {
    retentionAlertStatus,
    SessionStatus,
    type AttendanceSessionStatus,
    type RetentionAlertStatus,
} from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";

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
    switch (category) {
        case studentProgressCategory.FAST: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quinary)] text-[var(--white)]">
                    Avance Rapido
                </span>
            );
        }
        case studentProgressCategory.MODERATE: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-septenary)] text-[var(--white)]">
                    Moderado
                </span>
            );
        }
        case studentProgressCategory.SLOW: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-sextary)] text-[var(--white)]">
                    Lento
                </span>
            );
        }
        default: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-tertiary)] text-[var(--color-font)]">
                    Sin Datos
                </span>
            );
        }
    }
}

export function SessionStatusBadge({ status }: { status: AttendanceSessionStatus }) {
    if (status === SessionStatus.InProgress) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quinary)] text-[var(--white)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                En Curso
            </span>
        );
    } else if (status === SessionStatus.PendingApproval) {
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

export function AlertStatusBadge({ alertStatus }: { alertStatus: RetentionAlertStatus }) {
    if (alertStatus === retentionAlertStatus.Pending) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-quaternary)] text-[var(--white)]">
                Pendiente
            </span>
        );
    } else if (alertStatus === retentionAlertStatus.Resolved) {
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
