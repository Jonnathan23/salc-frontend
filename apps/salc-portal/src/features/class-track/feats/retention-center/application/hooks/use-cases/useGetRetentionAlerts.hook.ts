import { useQuery } from "@tanstack/react-query";
import { getRetentionAlertsUseCase } from "@salc/core/features/class-track-teachers/retation-alert/di/RetentionAlertModule";
import { GetRetentionAlertsDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import { retentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import type { SuccessResponse } from "@salc/core/interfaces/SuccesResponse";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { RetetionAlertsActives } from "@/features/class-track/feats/retention-center/presentation/interfaces/AlertsHooks.interface";

export const useGetRetetionAlertsActives = (status: RetetionAlertsActives) => {
    return useQuery({
        queryKey: ["retention-alerts", status],
        queryFn: async () => {
            if (!status) {
                const dtoPending = GetRetentionAlertsDto.create({ status: retentionAlertStatus.Pending });
                const dtoInProgress = GetRetentionAlertsDto.create({ status: retentionAlertStatus.InProgress });

                const pending = await getRetentionAlertsUseCase.execute(dtoPending);
                const inProgress = await getRetentionAlertsUseCase.execute(dtoInProgress);

                const allAlerts: SuccessResponse<RetentionAlertWithStudentProjection[]> = {
                    success: true,
                    message: "Alertas obtenidas exitosamente",
                    data: [...(pending.data ?? []), ...(inProgress.data ?? [])],
                };

                return allAlerts;
            }

            const dto = GetRetentionAlertsDto.create({ status });

            return await getRetentionAlertsUseCase.execute(dto);
        },
    });
};
