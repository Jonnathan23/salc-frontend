export interface BaseUserFormValues {
    us_full_name: string;
    us_email: string;
    us_role: string;
    us_password_hash?: string;
}

export interface BaseLoginFormValues {
    us_email: string;
    us_password_hash: string;
}
