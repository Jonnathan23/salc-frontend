import { useQuery } from "@tanstack/react-query";
import { getRetentionAlertsUseCase } from "@salc/core/features/class-track-teachers/retation-alert/di/RetentionAlertModule";
import { GetRetentionAlertsDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";

export const useGetRetentionAlerts = (status?: RetentionAlertStatus) => {
    return useQuery({
        queryKey: ["retention-alerts", status],
        queryFn: async () => {
            const dto = GetRetentionAlertsDto.create({ status });

            return await getRetentionAlertsUseCase.execute(dto);
        },
    });
};
