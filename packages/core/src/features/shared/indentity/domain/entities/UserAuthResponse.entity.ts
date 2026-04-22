import type { UserRoles } from "@salc/core/interfaces";


export const userState = {
    ACTIVE: "activo",
    INACTIVE: "inactivo"
} as const;

export type UserState = typeof userState[keyof typeof userState];

export interface UserAuthResponseEntity {
    us_id: string;
    us_full_name: string;
    us_email: string;
    us_role: UserRoles;
    us_is_active: UserState;
    permissions: string[];
}

export class UserAuthResponseEntityImpl implements UserAuthResponseEntity {
    constructor(
        public us_id: string,
        public us_full_name: string,
        public us_email: string,
        public us_role: UserRoles,
        public us_is_active: UserState,
        public permissions: string[]
    ) { }
}