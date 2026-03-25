import { CustomError } from "@salc/core/enums";
import { FormattedErrorResponse } from "@salc/core/interfaces";
import { ErrorResponseSchema } from "@salc/core/schemas";
import { DataAccessLayerAdapter } from "@salc/core/utils";
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";


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
    private readonly baseUrl: string;
    private onUnauthorizedCallback?: () => void;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.apiInstance = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.initializeInterceptors();
    }

    private initializeInterceptors(): void {
        this.interceptorResponse();
    }

    public setUnauthorizedCallback(callback: () => void): void {
        this.onUnauthorizedCallback = callback;
    }

    private interceptorRequest(): void {
        //Se dejó el método por si en un futuro se necesita agregar un token
        this.apiInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem("token");
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        );
    }

    private interceptorResponse(): void {
        this.apiInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError<unknown>) => {
                if (!error.response) {
                    return Promise.reject(CustomError.internalServer("Network error or server is unreachable"));
                }

                const statusCode = error.response.status;
                const rawData = error.response.data;

                let formattedErrors: Array<FormattedErrorResponse>;

                try {
                    const validatedData = DataAccessLayerAdapter.validateData(ErrorResponseSchema, rawData);
                    formattedErrors = validatedData.errors;
                } catch (validationError) {
                    formattedErrors = [{ message: "An unexpected error format was received from the server." }];
                }

                if (statusCode === 401) {
                    this.handleLogout();
                }

                const errorFactory = statusCodeToErrorMap[statusCode] ?? statusCodeToErrorMap[500];

                return Promise.reject(errorFactory(formattedErrors));
            }
        );
    }

    private handleLogout(): void {
        if (this.onUnauthorizedCallback) {
            this.onUnauthorizedCallback();
            return;
        }

        window.location.href = '/auth/login';
    }

    //* Public Methods

    public async get<ResponseType>(url: string): Promise<ResponseType> {
        return this.apiInstance.get<ResponseType>(url).then((response) => response.data);
    }

    public async post<ResponseType, RequestDataType>(url: string, data: RequestDataType): Promise<ResponseType> {
        console.log('\nurl')
        console.log(url)
        console.log('\ndata')
        console.log(data)
        return this.apiInstance.post<ResponseType>(url, data).then((response) => response.data);
    }

    public async patch<ResponseType, RequestDataType>(url: string, data: RequestDataType): Promise<ResponseType> {
        return this.apiInstance.patch<ResponseType>(url, data).then((response) => response.data);
    }

    public async delete<ResponseType>(url: string): Promise<ResponseType> {
        return this.apiInstance.delete<ResponseType>(url).then((response) => response.data);
    }
}