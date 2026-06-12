import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeRetentionAlertStatusUseCase } from "@salc/core/features/class-track-teachers/retation-alert/di/RetentionAlertModule";
import { ChangeRetentionAlertStatusDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/ChangeRetentionAlertStatus.dto";
import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";

export const useChangeRetentionAlertStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ alertId, status }: { alertId: string; status: RetentionAlertStatus }) => {
            const dto = ChangeRetentionAlertStatusDto.create({ status });

            return await changeRetentionAlertStatusUseCase.execute(alertId, dto);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["retention-alerts"] });
            ShowMessageAdapter.success(response.message || "Estado de alerta actualizado");
        },
        onError: (error: any) => {
            ShowMessageAdapter.error(error.message || "Ocurrió un error al cambiar el estado");
        },
    });
};
