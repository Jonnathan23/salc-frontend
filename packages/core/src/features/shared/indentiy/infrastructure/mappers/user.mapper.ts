import { CustomError } from "@salc/core/enums";
import { UserEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { userSchema } from "@salc/core/features/shared/indentiy/infrastructure/schemas";
import { SuccessResponse } from "@salc/core/interfaces";
import { DataAccessLayerAdapter } from "@salc/core/adapters";


type UserMapperProps = Record<string, unknown> | unknown | null | undefined;

export const UserMapper = {

    toEntity(rawObject: UserMapperProps): UserEntity {
        if (!rawObject) {
            throw CustomError.notFound("User data is missing");
        }

        const validationResponse = DataAccessLayerAdapter.validateData(userSchema, rawObject);

        return new UserEntity(
            validationResponse.us_id,
            validationResponse.us_full_name,
            validationResponse.us_email,
            validationResponse.us_password_hash,
            validationResponse.us_role,
            validationResponse.us_is_active,
            validationResponse.us_created_at,
            validationResponse.us_updated_at
        );
    },

    validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        const responseSchema = DataAccessLayerAdapter.buildSuccessResponseSchema();
        const validationResponse = DataAccessLayerAdapter.validateData(responseSchema, rawResponse);

        return validationResponse;
    }
};
