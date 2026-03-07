import { FormattedErrorResponse } from "@salc/core/interfaces/Errors";



export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly errors: Array<FormattedErrorResponse>;

    private constructor(statusCode: number, errors: Array<FormattedErrorResponse>) {
        const defaultMessage = errors.length > 0 ? errors[0].message : 'An unexpected error occurred';
        super(defaultMessage);

        this.statusCode = statusCode;
        this.errors = errors;

        // Restore prototype chain to allow 'instanceof CustomError' checks to work
        Object.setPrototypeOf(this, new.target.prototype);
    }

    /**
     * @description Creates a 400 Bad Request error. Handles both simple strings and backend array formats.
     */
    public static badRequest(payload: Array<FormattedErrorResponse> | string): CustomError {
        const formattedErrors = typeof payload === 'string'
            ? [{ message: payload }]
            : payload;

        return new CustomError(400, formattedErrors);
    }

    /**
     * @description Creates a 401 Unauthorized error
     */
    public static unauthorized(message: string): CustomError {
        return new CustomError(401, [{ message: message }]);
    }

    /**
     * @description Creates a 403 Forbidden error
     */
    public static forbidden(message: string): CustomError {
        return new CustomError(403, [{ message: message }]);
    }

    /**
     * @description Creates a 404 Not Found error
     */
    public static notFound(message: string): CustomError {
        return new CustomError(404, [{ message: message }]);
    }

    /**
     * @description Creates a 409 Conflict error
     */
    public static conflict(message: string): CustomError {
        return new CustomError(409, [{ message: message }]);
    }

    /**
     * @description Creates a 500 Internal Server error
     */
    public static internalServer(message: string = 'Internal server error'): CustomError {
        return new CustomError(500, [{ message: message }]);
    }

    /**
     * @description Creates a 503 Service Unavailable error
     */
    public static serviceUnavailable(message: string = 'Service is currently unavailable'): CustomError {
        return new CustomError(503, [{ message: message }]);
    }
}