import { DataAccessLayerAdapter } from "@salc/core/adapters";
import { CustomError } from "@salc/core/enums";
import { SystemPermission } from "@salc/core/enums/Permissions";
import { UserAuthResponseEntity, UserState } from "@salc/core/features/shared/indentiy/domain/entities/UserAuthResponse.entity";
import { userAuthResponseSchema } from "@salc/core/features/shared/indentiy/infrastructure/schemas";
import { UserRoles } from "@salc/core/interfaces";
import { Validators } from "@salc/core/utils";

type UserAuthResponseMapperProps = Record<string, unknown> | unknown | null | undefined;

export const UserAuthResponseMapper = {

    toEntity(rawObject: UserAuthResponseMapperProps): UserAuthResponseEntity {
        if (!rawObject) {
            throw CustomError.notFound("User auth response data is missing");
        }

        const validationResponse = DataAccessLayerAdapter.validateData(userAuthResponseSchema, rawObject);

        if (!Validators.isRole(validationResponse.us_role)) {
            throw CustomError.badRequest("Invalid role");
        }

        if (!Validators.isStateUser(validationResponse.us_is_active)) {
            throw CustomError.badRequest("Invalid state");
        }

        const userRole = validationResponse.us_role as UserRoles;
        const userState = validationResponse.us_is_active as UserState;

        return new UserAuthResponseEntity(
            validationResponse.us_id,
            validationResponse.us_full_name,
            validationResponse.us_email,
            userRole,
            userState,
            validationResponse.permissions as SystemPermission[]
        );
    }
}