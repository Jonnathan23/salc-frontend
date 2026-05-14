import { CustomError } from "@salc/core/enums";
import type { UserLoginEntity } from "@salc/core/features/shared/indentity/domain/entities";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";



type UserLoginResponseMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface UserLoginResponseMapper {
    toEntity(rawObject: UserLoginResponseMapperProps): UserLoginEntity;
}

export class UserLoginResponseMapperImpl implements UserLoginResponseMapper {

    constructor(
        private readonly validator: EntityValidator<UserLoginEntity>
    ) { }

    public toEntity(rawObject: UserLoginResponseMapperProps): UserLoginEntity {
        if (!rawObject) {
            throw CustomError.notFound("User login response data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        const userLoginEntity: UserLoginEntity = {
            user: validationResponse.user,
            token: validationResponse.token
        };

        return userLoginEntity;

    }
}