export const studentContractStatus = {
    ACTIVE: "ACTIVE",
    FROZEN: "FROZEN",
    INACTIVE: "INACTIVE",
} as const;

export type StudentContractStatus = (typeof studentContractStatus)[keyof typeof studentContractStatus];

export const studentProgressCategory = {
    FAST: "FAST",
    MODERATE: "MODERATE",
    SLOW: "SLOW",
    NOT_ENOUGH_DATA: "NOT_ENOUGH_DATA",
} as const;

export type StudentProgressCategory = (typeof studentProgressCategory)[keyof typeof studentProgressCategory];

export const certificateType = {
    ONE_TONNE: "ONE_TONNE",
    TOEFL: "TOEFL",
    OTHER: "OTHER",
} as const;

export type CertificateType = (typeof certificateType)[keyof typeof certificateType];

export const sessionStatus = {
    PENDING_APPROVAL: "PENDING_APPROVAL",
    IN_PROGRESS: "IN_PROGRESS",
    APPROVED: "APPROVED",
} as const;

export type SessionStatus = (typeof sessionStatus)[keyof typeof sessionStatus];

export const alertStatus = {
    PENDING: "PENDING",
    RESOLVED: "RESOLVED",
    CLOSED_FROZEN: "CLOSED_FROZEN",
} as const;

export type AlertStatus = (typeof alertStatus)[keyof typeof alertStatus];
