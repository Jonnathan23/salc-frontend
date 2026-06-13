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
import type { PaginatedResult } from "@salc/core/interfaces";

export interface AlertsActivesFilters extends Omit<GetRetentionAlertsDtoProps, "status"> {
    status?: RetetionAlertsActives;
}

export const useGetRetetionAlertsActives = (filters?: AlertsActivesFilters) => {
    return useQuery({
        queryKey: ["retention-alerts", filters],
        queryFn: async () => {
            if (!filters?.status) {
                const dtoPending = GetRetentionAlertsDto.create({
                    ...filters,
                    page: filters?.page ?? 1,
                    status: retentionAlertStatus.Pending,
                });
                const dtoInProgress = GetRetentionAlertsDto.create({
                    ...filters,
                    page: filters?.page ?? 1,
                    status: retentionAlertStatus.InProgress,
                });

                const pending = await getRetentionAlertsUseCase.execute(dtoPending);
                const inProgress = await getRetentionAlertsUseCase.execute(dtoInProgress);

                const pendingData = pending.data?.data ?? [];
                const inProgressData = inProgress.data?.data ?? [];
                const totalItems = (pending.data?.meta.totalItems ?? 0) + (inProgress.data?.meta.totalItems ?? 0);
                const itemsPerPage = filters?.limit ?? 10;

                const allAlerts: SuccessResponse<PaginatedResult<RetentionAlertWithStudentProjection>> = {
                    success: true,
                    message: "Alertas obtenidas exitosamente",
                    data: {
                        data: [...pendingData, ...inProgressData],
                        meta: {
                            totalItems,
                            itemCount: pending.data!.meta.itemCount + inProgress.data!.meta.itemCount,
                            itemsPerPage,
                            totalPages: Math.ceil(totalItems / itemsPerPage) || 1,
                            currentPage: filters?.page ?? 1,
                        },
                    },
                };

                return allAlerts;
            }

            const dto = GetRetentionAlertsDto.create({ ...filters, page: filters?.page ?? 1, status: filters?.status });

            return await getRetentionAlertsUseCase.execute(dto);
        },
    });
};
