import { CustomError } from "@salc/core/enums";
import { UserRoles } from "@salc/core/interfaces";
import { Validators } from "@salc/core/utils";


export class RegisterUserDto {

    private constructor(
        public us_full_name: string,
        public us_email: string,
        public us_password_hash: string,
        public us_role: UserRoles,        
    ) {}

    static create(user: RegisterUserDto): RegisterUserDto {

        const { us_full_name, us_email, us_password_hash, us_role } = user;

        if (!us_full_name || !us_email || !us_password_hash || !us_role) {
            throw CustomError.badRequest('All fields are required');
        }

        if (!Validators.isEmail(us_email)) {
            throw CustomError.badRequest('Invalid email');
        }

        if (!Validators.isStrongPassword(us_password_hash)) {
            throw CustomError.badRequest('Invalid password');
        }

        if (!Validators.isRole(us_role)) {
            throw CustomError.badRequest('Invalid role');
        }

        return new RegisterUserDto(
            us_full_name,
            us_email,
            us_password_hash,
            us_role,
        );
    }
    
}