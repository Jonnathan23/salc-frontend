# 🏗️ Frontend Core Architecture Context (SALC Monorepo)

**Role:** Act as a Senior Frontend Architect and QA Engineer expert in React, Vite, TypeScript, Bun Workspaces, Clean Architecture, and Domain-Driven Design (DDD).
**Project Context:** We are building the frontend for the SALC Institute using a Monorepo approach. The application is divided into `apps/` (React/Vite consumers) and `packages/` (agnostic logic and UI components).

---

## 🏛️ 1. Core Philosophy (`packages/core`)
The `core` package is **100% agnostic to React**. It contains pure TypeScript logic, Domain Entities, Use Cases, Repositories, and standard utilities. 
- **Validation:** Zod is used at the Infrastructure/Adapter layer to validate all incoming data.
- **Error Handling Symmetry:** The frontend uses exactly the same Error formats (`CustomError` and `FormattedErrorResponse`) and Success formats (`SuccessResponse`) as the backend.
- **Authentication:** Token management is handled automatically via `HttpOnly` cookies.

---

## 📂 2. Base Utilities & Configuration

### A. HTTP Client (`packages/core/src/lib/api.ts`)
Implements the Singleton pattern and the Factory pattern for error mapping. It automatically handles `HttpOnly` cookies for authentication.

```typescript
import { CustomError } from "@salc/core/enums";
import { FormattedErrorResponse } from "@salc/core/interfaces";
import axios, { AxiosInstance } from "axios";

type ErrorFactory = (errors: Array<FormattedErrorResponse>) => CustomError;

const statusCodeToErrorMap: Record<number, ErrorFactory> = {
    400: (errors) => CustomError.badRequest(errors),
    401: (errors) => CustomError.unauthorized(errors[0]?.message),
    403: (errors) => CustomError.forbidden(errors[0]?.message),
    404: (errors) => CustomError.notFound(errors[0]?.message),
    409: (errors) => CustomError.conflict(errors[0]?.message),
    500: (errors) => CustomError.internalServer(errors[0]?.message),
    503: (errors) => CustomError.serviceUnavailable(errors[0]?.message),
};

export class Api {
    private readonly apiInstance: AxiosInstance;
    public readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.apiInstance = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true, // Crucial for HttpOnly cookies
            headers: { 'Content-Type': 'application/json' }
        });
        this.initializeInterceptors();
    }

    private initializeInterceptors() {
        this.apiInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                const statusCode = error.response?.status || 500;
                let formattedErrors: Array<FormattedErrorResponse> = [];

                try {
                    const errorData = error.response?.data;
                    formattedErrors = errorData?.errors || [{ message: "Unexpected error" }];
                } catch (e) {
                    formattedErrors = [{ message: "An unexpected error format was received." }];
                }

                if (statusCode === 401) this.handleLogout();

                const errorFactory = statusCodeToErrorMap[statusCode] ?? statusCodeToErrorMap[500];
                return Promise.reject(errorFactory(formattedErrors));
            }
        );
    }

    private handleLogout(): void {
        // TODO: Handle unauthorized redirection
    }

    public async get<T>(url: string): Promise<T> {
        return this.apiInstance.get<T>(url).then(res => res.data);
    }
    public async post<T, D>(url: string, data: D): Promise<T> {
        return this.apiInstance.post<T>(url, data).then(res => res.data);
    }
    public async patch<T, D>(url: string, data: D): Promise<T> {
        return this.apiInstance.patch<T>(url, data).then(res => res.data);
    }
    public async delete<T>(url: string): Promise<T> {
        return this.apiInstance.delete<T>(url).then(res => res.data);
    }
}
```

### B. Data Access Adapter (`packages/core/src/utils/adapters/DataAccessLayer.ts`)
Validates unknown data against Zod schemas and maps validation errors directly into our domain `CustomError`.

```typescript
import z, { ZodSchema, ZodType, ZodTypeAny } from 'zod';
import { CustomError } from '../../enums/errors/CustomError.error';
import { FormattedErrorResponse } from '../../interfaces/Errors';
import { SuccessResponse } from '@salc/core/interfaces';

export type InferSchema<T extends ZodTypeAny> = z.infer<T>;

export class DataAccessLayerAdapter {
    public static validateData<ExpectedType>(schema: ZodSchema<ExpectedType>, rawData: unknown): ExpectedType {
        const validationResult = schema.safeParse(rawData);

        if (!validationResult.success) {
            const formattedErrors: Array<FormattedErrorResponse> = validationResult.error.issues.map((issue) => {
                return {
                    message: issue.message,
                    path: issue.path.join('.')
                };
            });
            throw CustomError.badRequest(formattedErrors);
        }
        return validationResult.data;
    }

    public static buildSuccessResponseSchema<ExpectedDataType = null>(dataSchema?: ZodType<ExpectedDataType>): ZodSchema<SuccessResponse<ExpectedDataType>> {
        return z.object({
            success: z.boolean(),
            message: z.string(),
            data: dataSchema ? dataSchema.nullable() : z.null().optional()
        }) as ZodSchema<SuccessResponse<ExpectedDataType>>;
    }
}
```

### C. Error Handling Mirror (`packages/core/src/enums/errors/CustomError.error.ts`)
```typescript
import { FormattedErrorResponse } from "@salc/core/interfaces/Errors";

export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly errors: Array<FormattedErrorResponse>;

    private constructor(statusCode: number, errors: Array<FormattedErrorResponse>) {
        const defaultMessage = errors.length > 0 ? errors[0].message : 'An unexpected error occurred';
        super(defaultMessage);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public static badRequest(payload: Array<FormattedErrorResponse> | string): CustomError {
        const formattedErrors = typeof payload === 'string' ? [{ message: payload }] : payload;
        return new CustomError(400, formattedErrors);
    }
    public static unauthorized(message: string): CustomError { return new CustomError(401, [{ message }]); }
    public static forbidden(message: string): CustomError { return new CustomError(403, [{ message }]); }
    public static notFound(message: string): CustomError { return new CustomError(404, [{ message }]); }
    public static conflict(message: string): CustomError { return new CustomError(409, [{ message }]); }
    public static internalServer(message: string = 'Internal server error'): CustomError { return new CustomError(500, [{ message }]); }
    public static serviceUnavailable(message: string): CustomError { return new CustomError(503, [{ message }]); }
}
```

### D. Shared Interfaces & Enums
**SuccessResponse (`packages/core/src/interfaces/SuccessResponse.ts`)**
```typescript
export interface SuccessResponse<T = null> {
    success: boolean;
    message: string;
    data: T | null;
}
```

**Roles (`packages/core/src/enums/Roles.ts`)**
```typescript
export const userRoles = {
    ADMIN: "ADMIN",
    TEACHER: "TEACHER",
    ADVISOR: "ADVISOR",
    ACADEMIC_DIRECTOR: "ACADEMIC_DIRECTOR"
} as const;

export type UserRoles = typeof userRoles[keyof typeof userRoles];
```