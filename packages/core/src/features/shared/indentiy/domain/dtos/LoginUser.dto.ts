import { CustomError } from "@salc/core/enums";
import { Validators } from "@salc/core/utils";

export interface LoginUserDto {
    us_email: string;
    us_password_hash: string;
}

export class LoginUserDtoImpl implements LoginUserDto{

    private constructor(
        public us_email: string,
        public us_password_hash: string
    ) {}

    static create(user: LoginUserDto): LoginUserDto{
        const { us_email, us_password_hash } = user;

        if (!us_email || !us_password_hash) {
            throw CustomError.badRequest('All fields are required');
        }

        if (!Validators.isEmail(us_email)) {
            throw CustomError.badRequest('Invalid email');
        }        

        return new LoginUserDtoImpl(
            us_email,
            us_password_hash,
        );
    }

}