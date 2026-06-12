import type { BaseRetentionAlertFormValues } from "@/features/class-track/feats/retention-center/presentation/interfaces/BaseRetentionAlertFormValues.interface";
import { UpdateRetentionAlertDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/UpdateRetentionAlert.dto";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";

export class RetentionAlertFormMapper {
    public static toUpdateDto(formValues: BaseRetentionAlertFormValues): UpdateRetentionAlertDto {
        return UpdateRetentionAlertDto.create({
            contactDate: formValues.contactDate ? formValues.contactDate : undefined,
            hasResponded: formValues.hasResponded,
            isJustified: formValues.isJustified,
            justificationReason: formValues.justificationReason ? formValues.justificationReason.trim() : undefined,
            returnDeadline: formValues.returnDeadline ? formValues.returnDeadline : undefined,
            observations: formValues.observations.trim(),
        });
    }

    public static toBaseFormValues(projection: RetentionAlertWithStudentProjection): BaseRetentionAlertFormValues {
        return {
            contactDate: projection.contactDate ? projection.contactDate.toISOString().split("T")[0] : "",
            hasResponded: projection.hasResponded,
            isJustified: projection.isJustified,
            justificationReason: projection.justificationReason || "",
            returnDeadline: projection.returnDeadline ? projection.returnDeadline.toISOString().split("T")[0] : "",
            observations: projection.observations || "",
        };
    }
}
