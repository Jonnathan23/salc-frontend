import { useQuery } from "@tanstack/react-query";
import { getRetentionAlertsUseCase } from "@salc/core/features/class-track-teachers/retation-alert/di/RetentionAlertModule";
import {
    GetRetentionAlertsDto,
    type GetRetentionAlertsDtoProps,
} from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import { retentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import type { SuccessResponse } from "@salc/core/interfaces";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { AlertsResolvedParameters } from "@/features/class-track/feats/retention-center/presentation/interfaces/AlertsHooks.interface";

export interface AlertsHistorialFilters extends Omit<GetRetentionAlertsDtoProps, "status"> {
    status?: AlertsResolvedParameters;
}

export const useGetHistorialAlerts = (filters?: AlertsHistorialFilters) => {
    return useQuery({
        queryKey: ["retention-alerts-historial", filters],
        queryFn: async () => {
            if (!filters?.status) {
                const dtoResolved = GetRetentionAlertsDto.create({ ...filters, status: retentionAlertStatus.Resolved });
                const dtoUnresolved = GetRetentionAlertsDto.create({ ...filters, status: retentionAlertStatus.Unresolved });

                const resolved = await getRetentionAlertsUseCase.execute(dtoResolved);
                const unresolved = await getRetentionAlertsUseCase.execute(dtoUnresolved);

                const allHistory: SuccessResponse<RetentionAlertWithStudentProjection[]> = {
                    success: true,
                    message: "Historial de alertas obtenido exitosamente",
                    data: [...(resolved.data ?? []), ...(unresolved.data ?? [])],
                };

                return allHistory;
            }

            const dto = GetRetentionAlertsDto.create({ ...filters, status: filters.status });

            return await getRetentionAlertsUseCase.execute(dto);
        },
    });
};
