import { CustomError } from "@salc/core/enums";
import { UserAuthResponseEntity, UseState } from "@salc/core/features/shared/indentiy/domain/entities/UserAuthResponse";
import { userAuthResponseSchema } from "@salc/core/features/shared/indentiy/infrastructure/schemas";
import { UserRoles } from "@salc/core/interfaces";
import { DataAccessLayerAdapter, Validators } from "@salc/core/utils";

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
        const userState = validationResponse.us_is_active as UseState;

        return new UserAuthResponseEntity(
            validationResponse.us_id,
            validationResponse.us_full_name,
            validationResponse.us_email,
            userRole,
            userState,
            validationResponse.permissions
        );
    }    
}