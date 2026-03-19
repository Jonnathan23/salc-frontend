import { CustomError } from "@salc/core/enums";
import { Validators } from "@salc/core/utils";


export class LoginUserDto {

    private constructor(
        public us_email: string,
        public us_password: string
    ) {}

    static create(user: LoginUserDto): LoginUserDto{
        const { us_email, us_password } = user;

        if (!us_email || !us_password) {
            throw CustomError.badRequest('All fields are required');
        }

        if (!Validators.isEmail(us_email)) {
            throw CustomError.badRequest('Invalid email');
        }        

        return new LoginUserDto(
            us_email,
            us_password,
        );
    }

}