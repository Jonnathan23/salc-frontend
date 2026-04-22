import type { UserAuthResponseEntity, UseState } from "@salc/core/features/shared/indentity/domain/entities/UserAuthResponse.entity";
import { UserAuthResponseEntityImpl } from "@salc/core/features/shared/indentity/domain/entities/UserAuthResponse.entity";
import { CustomError } from "@salc/core/enums";
import type { SystemPermission } from "@salc/core/enums/Permissions";
import type { UserRoles } from "@salc/core/interfaces";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import { Validators } from "@salc/core/utils";


export interface UserAuthResponseMapper {
    toEntity(rawObject: UserAuthResponseMapperProps): UserAuthResponseEntity;
}

type UserAuthResponseMapperProps = Record<string, unknown> | unknown | null | undefined;

export class UserAuthResponseMapperImpl implements UserAuthResponseMapper {

    constructor(
        private readonly validator: EntityValidator<UserAuthResponseEntity>
    ) { }

    public toEntity(rawObject: UserAuthResponseMapperProps): UserAuthResponseEntity {
        if (!rawObject) {
            throw CustomError.notFound("User auth response data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        if (!Validators.isRole(validationResponse.us_role)) {
            throw CustomError.badRequest("Invalid role");
        }

        if (!Validators.isStateUser(validationResponse.us_is_active)) {
            throw CustomError.badRequest("Invalid state");
        }

        const userRole = validationResponse.us_role as UserRoles;
        const userState = validationResponse.us_is_active as UseState;

        // Retornamos tu implementación concreta
        return new UserAuthResponseEntityImpl(
            validationResponse.us_id,
            validationResponse.us_full_name,
            validationResponse.us_email,
            userRole,
            userState,
            validationResponse.permissions as SystemPermission[]
        );
    }
}