export interface SuccessResponse<T = null> {
    success: boolean;
    message: string;
    data: T | null;
}