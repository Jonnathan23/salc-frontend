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
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                Activo
            </span>
        );
    } else if (status === studentContractStatus.FROZEN) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                Congelado
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive text-destructive-foreground">
                Inactivo
            </span>
        );
    }
}

export function ProgressCategoryBadge({ category }: { category: StudentProgressCategory }) {
    switch (category) {
        case studentProgressCategory.FAST: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    Avance Rapido
                </span>
            );
        }
        case studentProgressCategory.MODERATE: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                    Moderado
                </span>
            );
        }
        case studentProgressCategory.SLOW: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive text-destructive-foreground">
                    Lento
                </span>
            );
        }
        default: {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    Sin Datos
                </span>
            );
        }
    }
}

export function SessionStatusBadge({ status }: { status: AttendanceSessionStatus }) {
    if (status === SessionStatus.InProgress) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                En Curso
            </span>
        );
    } else if (status === SessionStatus.PendingApproval) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                Pendiente Aprobacion
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                Aprobado
            </span>
        );
    }
}

export function AlertStatusBadge({ alertStatus }: { alertStatus: RetentionAlertStatus }) {
    if (alertStatus === retentionAlertStatus.Pending) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive text-destructive-foreground">
                Pendiente
            </span>
        );
    } else if (alertStatus === retentionAlertStatus.Resolved) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                Resuelto
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                Cerrado / Congelado
            </span>
        );
    }
}
