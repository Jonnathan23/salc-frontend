import { CustomError } from "@salc/core/enums";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import { UserTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/UserTokenPayload.model";
import { StudentTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";
import { Validators } from "@salc/core/utils";
import { clientRoles, type ClientRoles } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";
import type { UserRoles } from "@salc/core/interfaces";

type PayloadMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface VerifyMapper {
    toUserTokenPayload(rawObject: PayloadMapperProps): UserTokenPayloadEntity;
    toStudentTokenPayload(rawObject: PayloadMapperProps): StudentTokenPayloadEntity;
}

export class VerifyMapperImpl implements VerifyMapper {
    constructor(
        private readonly userValidator: EntityValidator<UserTokenPayloadEntity>,
        private readonly studentValidator: EntityValidator<StudentTokenPayloadEntity>,
    ) {}

    toUserTokenPayload(rawObject: PayloadMapperProps): UserTokenPayloadEntity {
        if (!rawObject) {
            throw CustomError.notFound("User session data is missing");
        }

        const validationResponse = this.userValidator.validate(rawObject);

        if (!Validators.isRole(validationResponse.role)) {
            throw CustomError.badRequest("Invalid user role");
        }

        return new UserTokenPayloadEntity(validationResponse.id, validationResponse.email, validationResponse.role as UserRoles);
    }

    toStudentTokenPayload(rawObject: PayloadMapperProps): StudentTokenPayloadEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student session data is missing");
        }

        const validationResponse = this.studentValidator.validate(rawObject);

        const isValidStudentRole = Object.values(clientRoles).includes(validationResponse.role);

        if (!isValidStudentRole) {
            throw CustomError.badRequest("Invalid student role");
        }

        return new StudentTokenPayloadEntity(
            validationResponse.id,
            validationResponse.sessionId,
            validationResponse.role as ClientRoles,
        );
    }
}
