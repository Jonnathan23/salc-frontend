import { CustomError } from "@salc/core/enums";
import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { ChangePasswordDto, RegisterUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { UserEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { registerUserSchema } from "@salc/core/features/shared/indentiy/infrastructure/schemas";
import { SuccessResponse } from "@salc/core/interfaces";
import { apiSalc } from "@salc/core/lib";
import { DataAccessLayerAdapter } from "@salc/core/utils";


export class UserRepository implements UserDataSource {

    async create(user: RegisterUserDto): Promise<SuccessResponse> {
        try {

            const dataValidation = DataAccessLayerAdapter.validateData(registerUserSchema, user);

            const url = '/user'
            const rawResponse = await apiSalc.post<SuccessResponse, typeof dataValidation>(url, dataValidation);
            
            const validationResponse = this.validationNullInformation(rawResponse);

            return validationResponse;

        } catch (error) {
            throw this.handleError(error);
        }
    }

    async changePassword(id: string, newPassword: ChangePasswordDto): Promise<SuccessResponse> {
        try {
            const url = `/user/${id}/password`;
            const rawResponse = await apiSalc.patch<SuccessResponse, ChangePasswordDto>(url, newPassword);
            
            const validationResponse = this.validationNullInformation(rawResponse);
            return validationResponse;

        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    async changeStateActive(id: string): Promise<SuccessResponse> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<SuccessResponse<UserEntity>> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<SuccessResponse<UserEntity[]>> {
        throw new Error("Method not implemented.");
    }

    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        const responseShcema = DataAccessLayerAdapter.buildSuccessResponseSchema();
        const validationResponse = DataAccessLayerAdapter.validateData(responseShcema, rawResponse);

        return validationResponse

    }

    private handleError(error: unknown): never {
        if (error instanceof CustomError) throw error;

        throw CustomError.internalServer('Error al crear el usuario');
    }
}