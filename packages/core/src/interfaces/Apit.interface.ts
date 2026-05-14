
export interface MethodsHttp {
    get<ResponseType>(url: string): Promise<ResponseType>;
    post<ResponseType, RequestDataType>(url: string, data: RequestDataType): Promise<ResponseType>;
    patch<ResponseType, RequestDataType>(url: string, data: RequestDataType): Promise<ResponseType>;
    delete<ResponseType>(url: string): Promise<ResponseType>;
}

export interface ApiSettings {
    setUnauthorizedCallback(callback: () => void): void;
    setBaseUrl(baseUrl: string): void;
}

export interface Api extends MethodsHttp, ApiSettings { }