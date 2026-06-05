export const SessionStatus = {
    InProgress: "IN_PROGRESS",
    PendingApproval: "PENDING_APPROVAL",
    Approved: "APPROVED",
} as const;

export type AttendanceSessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus];

export const retentionAlertStatus = {
    Pending: "PENDING",
    InProgress: "IN_PROGRESS",
    Resolved: "RESOLVED",
    ClosedFrozen: "CLOSED_FROZEN",
} as const;

export type RetentionAlertStatus = (typeof retentionAlertStatus)[keyof typeof retentionAlertStatus];
