import { CustomError } from "@salc/core/enums";

export interface UpdateRetentionAlertDtoProps {
    contactDate?: string;
    hasResponded: boolean;
    isJustified: boolean;
    justificationReason?: string;
    returnDeadline?: string;
    observations: string;
}

export class UpdateRetentionAlertDto {
    private constructor(
        public readonly contactDate: string | undefined,
        public readonly hasResponded: boolean,
        public readonly isJustified: boolean,
        public readonly justificationReason: string | undefined,
        public readonly returnDeadline: string | undefined,
        public readonly observations: string,
    ) {}

    static create(data: UpdateRetentionAlertDtoProps): UpdateRetentionAlertDto {
        if (data.isJustified && !data.justificationReason) {
            throw CustomError.badRequest("Justification reason is required when alert is justified");
        }

        if (!data.observations) {
            throw CustomError.badRequest("Observations are required");
        }

        return new UpdateRetentionAlertDto(
            data.contactDate,
            data.hasResponded,
            data.isJustified,
            data.justificationReason,
            data.returnDeadline,
            data.observations,
        );
    }
}
