export interface FormattedErrorResponse {
    message: string;
    path?: string;
}

export interface ErrorResponse {
    errors: Array<FormattedErrorResponse>;
}