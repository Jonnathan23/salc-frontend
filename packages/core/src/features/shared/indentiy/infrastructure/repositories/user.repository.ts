import { CustomError } from "@salc/core/enums";
import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { ChangePasswordDto, RegisterUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { UserEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { UserMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/user.mapper";
import { SuccessResponse } from "@salc/core/interfaces";
import { apiSalc } from "@salc/core/lib";

export class UserRepository implements UserDataSource {

    public async create(user: RegisterUserDto): Promise<SuccessResponse> {
        try {
            const url = '/user';
            const rawResponse = await apiSalc.post<SuccessResponse, RegisterUserDto>(url, user);

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            throw this.handleError(error, 'Error creating user');
        }
    }

    public async changePassword(id: string, newPassword: ChangePasswordDto): Promise<SuccessResponse> {
        try {
            const url = `/user/${id}/password`;
            const rawResponse = await apiSalc.patch<SuccessResponse, ChangePasswordDto>(url, newPassword);

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            throw this.handleError(error, 'Error changing user password');
        }
    }

    public async changeStateActive(id: string): Promise<SuccessResponse> {
        try {
            const url = `/user/${id}/state`;
            const rawResponse = await apiSalc.post<SuccessResponse, {}>(url, {});

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            throw this.handleError(error, 'Error changing user state');
        }
    }

    public async findById(id: string): Promise<SuccessResponse<UserEntity>> {
        try {
            const url = `/user/${id}`;
            const rawResponse = await apiSalc.get<SuccessResponse<UserEntity>>(url);

            const entity = UserMapper.toEntity(rawResponse.data);

            return {
                ...rawResponse,
                data: entity
            };
        } catch (error) {
            throw this.handleError(error, 'Error fetching user details');
        }
    }

    public async findAll(): Promise<SuccessResponse<UserEntity[]>> {
        try {
            const url = '/user';
            const rawResponse = await apiSalc.get<SuccessResponse<UserEntity[]>>(url);

            if (!rawResponse.data) {
                throw CustomError.notFound("No users found");
            }

            const entities = rawResponse.data.map((user) => UserMapper.toEntity(user));

            return {
                ...rawResponse,
                data: entities
            };
        } catch (error) {
            throw this.handleError(error, 'Error fetching user list');
        }
    }

    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        return UserMapper.validationNullInformation(rawResponse);
    }

    private handleError(error: unknown, fallbackMessage: string): never {
        if (error instanceof CustomError) {
            throw error;
        }
        throw CustomError.internalServer(fallbackMessage);
    }
}