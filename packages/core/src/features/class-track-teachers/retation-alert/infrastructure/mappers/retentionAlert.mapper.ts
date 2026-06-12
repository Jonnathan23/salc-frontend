import { CustomError } from "@salc/core/enums";
import { RetentionAlertEntity } from "@salc/core/features/class-track-teachers/retation-alert/domain/entities/RetentionAlert.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";

type RetentionAlertMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface RetentionAlertMapper {
    toEntity(rawObject: RetentionAlertMapperProps): RetentionAlertEntity;
    toArrayEntities(rawObjects: RetentionAlertMapperProps[]): RetentionAlertEntity[];
}

export class RetentionAlertMapperImpl implements RetentionAlertMapper {
    constructor(
        private readonly validator: EntityValidator<RetentionAlertEntity>,
        private readonly arrayValidator: EntityValidator<RetentionAlertEntity[]>,
    ) {}

    toEntity(rawObject: RetentionAlertMapperProps): RetentionAlertEntity {
        if (!rawObject) {
            throw CustomError.notFound("Retention alert data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        return new RetentionAlertEntity(
            validationResponse.reAlId,
            validationResponse.reAlStudentId,
            validationResponse.reAlUserId,
            validationResponse.reAlContactDate ? new Date(validationResponse.reAlContactDate) : null,
            validationResponse.reAlHasResponded,
            validationResponse.reAlDaysAbsent,
            validationResponse.reAlIsJustified,
            validationResponse.reAlJustificationReason || null,
            validationResponse.reAlReturnDeadline ? new Date(validationResponse.reAlReturnDeadline) : null,
            validationResponse.reAlObservations,
            validationResponse.reAlStatus as RetentionAlertStatus,
            new Date(validationResponse.reAlCreatedAt),
        );
    }

    toArrayEntities(rawObjects: RetentionAlertMapperProps[]): RetentionAlertEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Retention alerts data is missing");
        }
        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map((alert) => this.toEntity(alert));
    }
}
