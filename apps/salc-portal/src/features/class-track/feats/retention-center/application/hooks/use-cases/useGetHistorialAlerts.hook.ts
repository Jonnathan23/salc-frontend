import { useQuery } from "@tanstack/react-query";
import { getRetentionAlertsUseCase } from "@salc/core/features/class-track-teachers/retation-alert/di/RetentionAlertModule";
import {
    GetRetentionAlertsDto,
    type GetRetentionAlertsDtoProps,
} from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import { retentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import type { SuccessResponse, PaginatedResult } from "@salc/core/interfaces";
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
                const dtoResolved = GetRetentionAlertsDto.create({
                    ...filters,
                    page: filters?.page ?? 1,
                    status: retentionAlertStatus.Resolved,
                });
                const dtoUnresolved = GetRetentionAlertsDto.create({
                    ...filters,
                    page: filters?.page ?? 1,
                    status: retentionAlertStatus.Unresolved,
                });

                const resolved = await getRetentionAlertsUseCase.execute(dtoResolved);
                const unresolved = await getRetentionAlertsUseCase.execute(dtoUnresolved);

                const resolvedData = resolved.data?.data ?? [];
                const unresolvedData = unresolved.data?.data ?? [];
                const totalItems = (resolved.data?.meta.totalItems ?? 0) + (unresolved.data?.meta.totalItems ?? 0);
                const itemsPerPage = filters?.limit ?? 10;

                const allHistory: SuccessResponse<PaginatedResult<RetentionAlertWithStudentProjection>> = {
                    success: true,
                    message: "Historial de alertas obtenido exitosamente",
                    data: {
                        data: [...resolvedData, ...unresolvedData],
                        meta: {
                            totalItems,
                            itemCount: resolvedData.length + unresolvedData.length,
                            itemsPerPage,
                            totalPages: Math.ceil(totalItems / itemsPerPage) || 1,
                            currentPage: filters?.page ?? 1,
                        },
                    },
                };

                return allHistory;
            }

            const dto = GetRetentionAlertsDto.create({ ...filters, page: filters?.page ?? 1, status: filters?.status });

            return await getRetentionAlertsUseCase.execute(dto);
        },
    });
};
