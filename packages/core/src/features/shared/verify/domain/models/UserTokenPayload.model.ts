import type { UserRoles } from "@salc/core/interfaces";

export class UserTokenPayloadEntity {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly role: UserRoles,
    ) {}
}
