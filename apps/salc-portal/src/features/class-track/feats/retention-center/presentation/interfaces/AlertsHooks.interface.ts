import type { retentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";

export type AlertsResolvedParameters = (typeof retentionAlertStatus)["Resolved" | "ClosedFrozen"] | undefined;

export type RetetionAlertsActives = (typeof retentionAlertStatus)["Pending" | "InProgress"] | undefined;
