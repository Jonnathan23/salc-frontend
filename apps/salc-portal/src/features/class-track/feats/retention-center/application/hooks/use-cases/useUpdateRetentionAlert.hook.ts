import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRetentionAlertUseCase } from "@salc/core/features/class-track-teachers/retation-alert/di/RetentionAlertModule";

import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import type { BaseRetentionAlertFormValues } from "@/features/class-track/feats/retention-center/presentation/interfaces/BaseRetentionAlertFormValues.interface";
import { RetentionAlertFormMapper } from "@/features/class-track/feats/retention-center/presentation/mappers/retentionAlertForm.mapper";

export const useUpdateRetentionAlert = (alertId: string, onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseRetentionAlertFormValues) => {
            const dto = RetentionAlertFormMapper.toUpdateDto(formData);

            return await updateRetentionAlertUseCase.execute(alertId, dto);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["retention-alerts"] });
            ShowMessageAdapter.success(response.message || "Alerta actualizada correctamente");
            if (onSuccessCallback) onSuccessCallback();
        },
    });
};
