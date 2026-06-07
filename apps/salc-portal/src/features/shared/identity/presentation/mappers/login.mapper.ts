import type { BaseLoginFormValues } from "@/features/shared/identity/presentation/interfaces";
import { LoginUserDtoImpl, type LoginUserDto } from "@salc/core/features/shared/identity/domain/dtos";

export const LoginMapper = {
    toLoginDto(formValues: BaseLoginFormValues): LoginUserDto {
        const { email, passwordHash } = formValues;

        return LoginUserDtoImpl.create({
            us_email: email,
            us_password_hash: passwordHash,
        });
    },
};
