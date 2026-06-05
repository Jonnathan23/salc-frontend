export const SessionStatus = {
    Active: "Activa",
    Closed: "Cerrada",
    ClosedSystem: "Cerrada por el sistema",
    PendingApproval: "Pendiente de aprobación",
} as const;

export type AttendanceSessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus];
