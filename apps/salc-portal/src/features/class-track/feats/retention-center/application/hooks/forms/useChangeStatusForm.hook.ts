import { retentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import { useChangeRetentionAlertStatus } from "@/features/class-track/feats/retention-center/application/hooks/use-cases/useChangeRetentionAlertStatus.hook";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";

interface UseChangeStatusFormProps {
    onSuccessCallback?: () => void;
}

export const useChangeStatusForm = ({ onSuccessCallback }: UseChangeStatusFormProps) => {
    const { mutate } = useChangeRetentionAlertStatus(onSuccessCallback);

    const canChangeStatusToPending = (alert: RetentionAlertWithStudentProjection) => {
        const canBePending = Boolean(
            !alert.contactDate &&
            !alert.hasResponded &&
            !alert.returnDeadline &&
            !alert.observations &&
            !alert.justificationReason,
        );

        return canBePending;
    };

    const canChangeStatusToResolved = (alert: RetentionAlertWithStudentProjection) => {
        let messageEmptyField = "; ";
        let canBeResolved = true;

        if (!alert.contactDate) {
            messageEmptyField += "No se selecionó fecha de contacto";
            canBeResolved = false;
        }

        if (!alert.hasResponded) {
            messageEmptyField += "No se selecionó que el alumno respondió";
            canBeResolved = false;
        }
        if (!alert.isJustified) {
            messageEmptyField += "Sin justificacion";
            canBeResolved = false;
        }
        if (!alert.justificationReason) {
            messageEmptyField += "Sin razon de justificacion";
            canBeResolved = false;
        }
        if (!alert.returnDeadline) {
            messageEmptyField += "Sin fecha de retorno";
            canBeResolved = false;
        }
        if (!alert.observations) {
            messageEmptyField += "Sin observaciones";
            canBeResolved = false;
        }

        return { canBeResolved, messageEmptyField };
    };

    const handleMarkAsResolved = (alert: RetentionAlertWithStudentProjection) => {
        const { canBeResolved, messageEmptyField } = canChangeStatusToResolved(alert);

        if (!canBeResolved) {
            ShowMessageAdapter.error(`No se puede cambiar el estado ${messageEmptyField}`);

            return;
        }
        mutate({ alertId: alert.id, status: retentionAlertStatus.Resolved });
    };

    const handleMarkAsUnresolved = (alert: RetentionAlertWithStudentProjection) => {
        mutate({ alertId: alert.id, status: retentionAlertStatus.Unresolved });
    };

    const handleMarkAsPending = (alert: RetentionAlertWithStudentProjection) => {
        if (!canChangeStatusToPending(alert)) {
            ShowMessageAdapter.error("No se puede cambiar el estado de la alerta a pendiente");

            return;
        }

        mutate({ alertId: alert.id, status: retentionAlertStatus.Pending });
    };

    const handleMarkAsInProgress = (alert: RetentionAlertWithStudentProjection) => {
        if (canChangeStatusToPending(alert)) {
            ShowMessageAdapter.error("No se puede cambiar el estado de la alerta a en progreso");

            return;
        }
        mutate({ alertId: alert.id, status: retentionAlertStatus.InProgress });
    };

    return {
        handleMarkAsResolved,
        handleMarkAsUnresolved,
        handleMarkAsPending,
        handleMarkAsInProgress,
    };
};
