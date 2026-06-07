import type { UserRoles } from "@salc/core/interfaces";

export class UserEntity {
    private constructor(
        public userId: string,
        public fullName: string,
        public email: string,
        public passwordHash: string,
        public role: UserRoles,
        public isActive: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
}
