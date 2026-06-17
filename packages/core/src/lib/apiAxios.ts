import { CustomError } from "@salc/core/enums";
import { type ErrorResponse, type FormattedErrorResponse, type Api, type HttpConfig } from "@salc/core/interfaces";
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import { headerConstants, type ClientContext } from "@salc/core/enums/ClientContext";

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

export class ApiAxios implements Api {
    private readonly apiInstance: AxiosInstance;
    private baseUrl: string;
    private readonly validateErrorResponse: EntityValidator<ErrorResponse>;
    private onUnauthorizedCallback?: () => void;

    constructor(baseUrl: string, validateErrorResponse: EntityValidator<ErrorResponse>, clientContext: ClientContext) {
        this.baseUrl = baseUrl;
        this.validateErrorResponse = validateErrorResponse;
        this.apiInstance = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                [headerConstants.clientContextName]: clientContext,
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

    public setClientContext(clientContext: ClientContext): void {
        this.apiInstance.defaults.headers[headerConstants.clientContextName] = clientContext;
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
                    const validatedData = this.validateErrorResponse.validate(rawData);

                    formattedErrors = validatedData.errors;
                } catch {
                    formattedErrors = [{ message: "An unexpected error format was received from the server." }];
                }

                if (statusCode === 401) {
                    this.handleLogout();
                }

                const errorFactory = statusCodeToErrorMap[statusCode] ?? statusCodeToErrorMap[500];

                return Promise.reject(errorFactory(formattedErrors));
            },
        );
    }

    private handleLogout(): void {
        this.onUnauthorizedCallback?.();
    }

    //* Public Methods

    public async get<ResponseType>(url: string, config?: HttpConfig): Promise<ResponseType> {
        // TRADUCCIÓN VITAL: Pasamos de 'parameters' (nuestro dominio) a 'params' (lo que exige Axios)
        // eslint-disable-next-line unicorn/prevent-abbreviations
        const axiosConfig = config ? { ...config, params: config.parameters } : undefined;

        return this.apiInstance.get<ResponseType>(url, axiosConfig).then((response) => response.data);
    }

    public async post<ResponseType, RequestDataType>(
        url: string,
        data: RequestDataType,
        config?: HttpConfig,
    ): Promise<ResponseType> {
        // eslint-disable-next-line unicorn/prevent-abbreviations
        const axiosConfig = config ? { ...config, params: config.parameters } : undefined;

        return this.apiInstance.post<ResponseType>(url, data, axiosConfig).then((response) => response.data);
    }

    public async patch<ResponseType, RequestDataType>(
        url: string,
        data: RequestDataType,
        config?: HttpConfig,
    ): Promise<ResponseType> {
        // eslint-disable-next-line unicorn/prevent-abbreviations
        const axiosConfig = config ? { ...config, params: config.parameters } : undefined;

        return this.apiInstance.patch<ResponseType>(url, data, axiosConfig).then((response) => response.data);
    }

    public async delete<ResponseType>(url: string, config?: HttpConfig): Promise<ResponseType> {
        // eslint-disable-next-line unicorn/prevent-abbreviations
        const axiosConfig = config ? { ...config, params: config.parameters } : undefined;

        return this.apiInstance.delete<ResponseType>(url, axiosConfig).then((response) => response.data);
    }

    public setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
        this.apiInstance.defaults.baseURL = this.baseUrl;
    }
}
