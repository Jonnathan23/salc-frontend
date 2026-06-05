import type { BaseLoginFormValues } from "@/features/shared/identity/presentation/interfaces";
import { LoginUserDtoImpl, type LoginUserDto } from "@salc/core/features/shared/identity/domain/dtos";


export class LoginMapper {

    static toLoginDto(formValues: BaseLoginFormValues): LoginUserDto {
        const { us_email, us_password_hash } = formValues;

        return LoginUserDtoImpl.create({
            us_email,
            us_password_hash,
        });
    }

}