export interface BaseUserFormValues {
    fullName: string;
    email: string;
    role: string;
    passwordHash?: string;
}

export interface BaseLoginFormValues {
    email: string;
    passwordHash: string;
}
