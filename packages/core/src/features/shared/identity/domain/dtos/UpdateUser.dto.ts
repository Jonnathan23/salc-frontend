import { CustomError } from "@salc/core/enums";
import type { UserRoles } from "@salc/core/interfaces";

export interface UpdateUserDto {
    us_full_name?: string;
    us_email?: string;
    us_role?: UserRoles;
}

export class UpdateUserDtoImpl implements UpdateUserDto {
    constructor(
        public us_full_name?: string,
        public us_email?: string,
        public us_role?: UserRoles,
    ) { }

    static create(user: UpdateUserDto): UpdateUserDto {
        const { us_full_name, us_email, us_role } = user;

        if (!us_full_name && !us_email && !us_role) throw CustomError.badRequest('Missing name, email and role');

        return new UpdateUserDtoImpl(us_full_name, us_email, us_role);
    }

}