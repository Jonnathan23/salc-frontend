

export interface Api {
    get<ResponseType>(url: string): Promise<ResponseType>;
    post<ResponseType, RequestDataType>(url: string, data: RequestDataType): Promise<ResponseType>;
    patch<ResponseType, RequestDataType>(url: string, data: RequestDataType): Promise<ResponseType>;
    delete<ResponseType>(url: string): Promise<ResponseType>;
    setUnauthorizedCallback(callback: () => void): void;
}