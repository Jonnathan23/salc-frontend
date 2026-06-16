import type { ClientContext } from "@salc/core/enums/ClientContext";

export interface HttpConfig {
    parameters?: Record<string, unknown>;
    headers?: Record<string, string>;
}

export interface MethodsHttp {
    get<ResponseType>(url: string, config?: HttpConfig): Promise<ResponseType>;
    post<ResponseType, RequestDataType>(url: string, data: RequestDataType, config?: HttpConfig): Promise<ResponseType>;
    patch<ResponseType, RequestDataType>(url: string, data: RequestDataType, config?: HttpConfig): Promise<ResponseType>;
    delete<ResponseType>(url: string, config?: HttpConfig): Promise<ResponseType>;
}

export interface ApiSettings {
    setUnauthorizedCallback(callback: () => void): void;
    setBaseUrl(baseUrl: string): void;
    setClientContext(clientContext: ClientContext): void;
}

export interface Api extends MethodsHttp, ApiSettings {}
