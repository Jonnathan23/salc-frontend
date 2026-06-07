import type { BaseUserFormValues } from "@/features/shared/identity/presentation/interfaces/BaseFormValues.interface";
import {
    RegisterUserDtoImpl,
    UpdateUserDtoImpl,
    type RegisterUserDto,
    type UpdateUserDto,
} from "@salc/core/features/shared/identity/domain/dtos";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/identity/domain/entities";
import type { UserRoles } from "@salc/core/interfaces";

export const UserMapper = {
    toRegisterDto(formValues: BaseUserFormValues): RegisterUserDto {
        const { fullName, email, passwordHash, role } = formValues as BaseUserFormValues & { passwordHash: string };

        return RegisterUserDtoImpl.create({
            us_full_name: fullName,
            us_email: email,
            us_password_hash: passwordHash,
            us_role: role as UserRoles,
        });
    },

    toUpdateDto(formValues: BaseUserFormValues): UpdateUserDto {
        const { fullName, email, role } = formValues;

        return UpdateUserDtoImpl.create({
            us_full_name: fullName,
            us_email: email,
            us_role: role as UserRoles,
        });
    },

    toBaseUserFormValues(user: UserAuthResponseEntity): BaseUserFormValues {
        const { fullName, email, role } = user;

        return {
            fullName: fullName || "",
            email: email || "",
            role: role as UserRoles,
        };
    },
};
