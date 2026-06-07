import type { UserRoles } from "@salc/core/interfaces";

export const userState = {
    ACTIVE: "activo",
    INACTIVE: "inactivo",
} as const;

export type UserState = (typeof userState)[keyof typeof userState];

export interface UserAuthResponseEntity {
    userId: string;
    fullName: string;
    email: string;
    role: UserRoles;
    isActive: UserState;
    permissions: string[];
}

export class UserAuthResponseEntityImpl implements UserAuthResponseEntity {
    constructor(
        public userId: string,
        public fullName: string,
        public email: string,
        public role: UserRoles,
        public isActive: UserState,
        public permissions: string[],
    ) {}
}
