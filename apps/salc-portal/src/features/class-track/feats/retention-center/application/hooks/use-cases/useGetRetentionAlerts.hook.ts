import { useQuery } from "@tanstack/react-query";
import { getRetentionAlertsUseCase } from "@salc/core/features/class-track-teachers/retation-alert/di/RetentionAlertModule";
import {
    GetRetentionAlertsDto,
    type GetRetentionAlertsDtoProps,
} from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import { retentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import type { SuccessResponse } from "@salc/core/interfaces/SuccesResponse";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { RetetionAlertsActives } from "@/features/class-track/feats/retention-center/presentation/interfaces/AlertsHooks.interface";

export interface AlertsActivesFilters extends Omit<GetRetentionAlertsDtoProps, "status"> {
    status?: RetetionAlertsActives;
}

export const useGetRetetionAlertsActives = (filters?: AlertsActivesFilters) => {
    return useQuery({
        queryKey: ["retention-alerts", filters],
        queryFn: async () => {
            if (!filters?.status) {
                const dtoPending = GetRetentionAlertsDto.create({ ...filters, status: retentionAlertStatus.Pending });
                const dtoInProgress = GetRetentionAlertsDto.create({ ...filters, status: retentionAlertStatus.InProgress });

                const pending = await getRetentionAlertsUseCase.execute(dtoPending);
                const inProgress = await getRetentionAlertsUseCase.execute(dtoInProgress);

                const allAlerts: SuccessResponse<RetentionAlertWithStudentProjection[]> = {
                    success: true,
                    message: "Alertas obtenidas exitosamente",
                    data: [...(pending.data ?? []), ...(inProgress.data ?? [])],
                };

                return allAlerts;
            }

            const dto = GetRetentionAlertsDto.create({ ...filters, status: filters.status });

            return await getRetentionAlertsUseCase.execute(dto);
        },
    });
};
