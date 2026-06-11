import { CustomError } from "@salc/core/enums";
import {
    RetentionAlertWithStudentProjection,
    BasicStudentInfo,
} from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";

type RetentionAlertWithStudentMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface RetentionAlertWithStudentMapper {
    toProjection(rawObject: RetentionAlertWithStudentMapperProps): RetentionAlertWithStudentProjection;
    toArrayProjections(rawObjects: RetentionAlertWithStudentMapperProps[]): RetentionAlertWithStudentProjection[];
}

export class RetentionAlertWithStudentMapperImpl implements RetentionAlertWithStudentMapper {
    constructor(
        private readonly validator: EntityValidator<RetentionAlertWithStudentProjection>,
        private readonly arrayValidator: EntityValidator<RetentionAlertWithStudentProjection[]>,
    ) {}

    toProjection(rawObject: RetentionAlertWithStudentMapperProps): RetentionAlertWithStudentProjection {
        if (!rawObject) {
            throw CustomError.notFound("Retention alert data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        const student = new BasicStudentInfo(
            validationResponse.student.id,
            validationResponse.student.fullName,
            validationResponse.student.identificationCard,
            validationResponse.student.phoneNumber,
            validationResponse.student.contractStatus,
        );

        return new RetentionAlertWithStudentProjection(
            validationResponse.id,
            validationResponse.contactDate ? new Date(validationResponse.contactDate) : null,
            validationResponse.hasResponded,
            validationResponse.daysAbsent,
            validationResponse.isJustified,
            validationResponse.justificationReason || null,
            validationResponse.returnDeadline ? new Date(validationResponse.returnDeadline) : null,
            validationResponse.observations,
            validationResponse.status as RetentionAlertStatus,
            student,
            new Date(validationResponse.createdAt),
        );
    }

    toArrayProjections(rawObjects: RetentionAlertWithStudentMapperProps[]): RetentionAlertWithStudentProjection[] {
        if (!rawObjects) {
            throw CustomError.notFound("Retention alerts data is missing");
        }
        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map((alert) => this.toProjection(alert));
    }
}
