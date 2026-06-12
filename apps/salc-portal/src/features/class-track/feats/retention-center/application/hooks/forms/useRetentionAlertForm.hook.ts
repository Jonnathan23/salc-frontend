import { useState } from "react";

import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { BaseRetentionAlertFormValues } from "@/features/class-track/feats/retention-center/presentation/interfaces/BaseRetentionAlertFormValues.interface";
import { RetentionAlertFormMapper } from "@/features/class-track/feats/retention-center/presentation/mappers/retentionAlertForm.mapper";
import { useUpdateRetentionAlert } from "@/features/class-track/feats/retention-center/application/hooks/use-cases/useUpdateRetentionAlert.hook";

const defaultValues: BaseRetentionAlertFormValues = {
    contactDate: "",
    hasResponded: false,
    isJustified: false,
    justificationReason: "",
    returnDeadline: "",
    observations: "",
};

export const useRetentionAlertForm = (
    alertProjection: RetentionAlertWithStudentProjection | null,
    onSuccessCallback: () => void,
) => {
    const [formValues, setFormValues] = useState<BaseRetentionAlertFormValues>(() =>
        alertProjection ? RetentionAlertFormMapper.toBaseFormValues(alertProjection) : defaultValues,
    );
    const [prevAlertId, setPrevAlertId] = useState<string | undefined>(alertProjection?.id);

    if (alertProjection?.id !== prevAlertId) {
        setPrevAlertId(alertProjection?.id);
        setFormValues(alertProjection ? RetentionAlertFormMapper.toBaseFormValues(alertProjection) : defaultValues);
    }

    const handleChange = (field: keyof BaseRetentionAlertFormValues, value: unknown) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const { mutate: updateAlertMutation, isPending: isSubmitting } = useUpdateRetentionAlert(
        alertProjection?.id || "",
        onSuccessCallback,
    );

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!alertProjection) return;
        updateAlertMutation(formValues);
    };

    const reset = () => setFormValues(defaultValues);

    return {
        formValues,
        handleChange,
        handleSubmit,
        isSubmitting,
        reset,
    };
};
