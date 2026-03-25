import { CustomError } from "@salc/core/enums";
import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { UserAuthResponseEntity, UserEntity, UserLoginEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { UserMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/user.mapper";
import { UserAuthResponseMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/userAuthResponse.mapper";
import { UserLoginResponseMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/userLoginResponse.mapper";
import { SuccessResponse } from "@salc/core/interfaces";
import { apiSalc } from "@salc/core/lib";

export class UserRepository implements UserDataSource {

    private readonly baseUrl = '/user';

    public async create(user: RegisterUserDto): Promise<SuccessResponse> {
        try {
            const url = `${this.baseUrl}`;
            const rawResponse = await apiSalc.post<SuccessResponse, RegisterUserDto>(url, user);

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            throw this.handleError(error, 'Error creating user');
        }
    }

    public async login(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>> {
        try {
            const url = `${this.baseUrl}/login`;
            const rawResponse = await apiSalc.post<SuccessResponse<UserAuthResponseEntity>, LoginUserDto>(url, user);

            if (!rawResponse.data) {
                throw CustomError.notFound("User data is missing");
            }

            const userLoginEntity = UserAuthResponseMapper.toEntity(rawResponse.data);

            const response: SuccessResponse<UserAuthResponseEntity> = {
                ...rawResponse,
                data: userLoginEntity
            }

            return response;
        } catch (error) {
            console.log('\nerror')
            console.log(error)
            throw this.handleError(error, 'Error logging in user');
        }
    }


    public async changePassword(id: string, newPassword: ChangePasswordDto): Promise<SuccessResponse> {
        try {
            const url = `${this.baseUrl}/${id}/password`;
            const rawResponse = await apiSalc.patch<SuccessResponse, ChangePasswordDto>(url, newPassword);

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            throw this.handleError(error, 'Error changing user password');
        }
    }

    public async changeStateActive(id: string): Promise<SuccessResponse> {
        try {
            const url = `${this.baseUrl}/${id}/state`;
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
            const url = `${this.baseUrl}`;
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