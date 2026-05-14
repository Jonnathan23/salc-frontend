import type { BaseUserFormValues } from "@/features/indentity/presentation/interfaces/BaseFormValues.interface";
import { RegisterUserDtoImpl, UpdateUserDtoImpl, type RegisterUserDto, type UpdateUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import type { UserRoles } from "@salc/core/interfaces";

export class UserMapper {

    static toRegisterDto(formValues: BaseUserFormValues): RegisterUserDto {

        const { us_full_name, us_email, us_password_hash, us_role } = formValues;

        return RegisterUserDtoImpl.create({
            us_full_name,
            us_email,
            us_password_hash: us_password_hash || '',
            us_role: us_role as UserRoles,
        });
    }

    static toUpdateDto(formValues: BaseUserFormValues): UpdateUserDto {
        const { us_full_name, us_email, us_role } = formValues;

        return UpdateUserDtoImpl.create({
            us_full_name,
            us_email,
            us_role: us_role as UserRoles,
        });
    }

    static toBaseUserFormValues(user: UpdateUserDto): BaseUserFormValues {
        const { us_full_name, us_email, us_role } = user;

        return {
            us_full_name: us_full_name || '',
            us_email: us_email || '',
            us_role: us_role as UserRoles,
        };
    }
}