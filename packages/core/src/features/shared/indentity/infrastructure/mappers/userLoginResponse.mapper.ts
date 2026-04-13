import { CustomError } from "@salc/core/enums";
import { UserLoginEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { UserAuthResponseMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/userAuthResponse.mapper";
import { loginResponseSchema } from "@salc/core/features/shared/indentiy/infrastructure/schemas";
import { DataAccessLayerAdapter } from "@salc/core/adapters";


type UserLoginResponseMapperProps = Record<string, unknown> | unknown | null | undefined;

export const UserLoginResponseMapper = {

    toEntity(rawObject: UserLoginResponseMapperProps): UserLoginEntity {
        if (!rawObject) {
            throw CustomError.notFound("User login response data is missing");
        }

        const validationResponse = DataAccessLayerAdapter.validateData(loginResponseSchema, rawObject);

        const userResponseEntity = UserAuthResponseMapper.toEntity(validationResponse.user);

        const userLoginEntity: UserLoginEntity = {
            user: userResponseEntity,
            token: validationResponse.token
        };

        return userLoginEntity;

    }
}
