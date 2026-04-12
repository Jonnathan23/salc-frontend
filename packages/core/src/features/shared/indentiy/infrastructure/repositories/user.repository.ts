import { CustomError } from "@salc/core/enums";
import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { UserAuthResponseEntity, UserEntity, UserLoginEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { UserMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/user.mapper";
import { UserAuthResponseMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/userAuthResponse.mapper";
import { UserLoginResponseMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/userLoginResponse.mapper";
import { SuccessResponse } from "@salc/core/interfaces";
import { Api } from "@salc/core/interfaces/Apit.interface";



export class UserRepository implements UserDataSource {

    private readonly baseUrl = '/user';
    constructor(private readonly api: Api) { }

    public async create(user: RegisterUserDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.api.post<SuccessResponse, RegisterUserDto>(url, user);

        return this.validationNullInformation(rawResponse);
    }

    public async login(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>> {
        const url = `${this.baseUrl}/login`;
        const rawResponse = await this.api.post<SuccessResponse<UserAuthResponseEntity>, LoginUserDto>(url, user);

        if (!rawResponse.data) {
            throw CustomError.notFound("User data is missing");
        }

        const userLoginEntity = UserAuthResponseMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: userLoginEntity
        };
    }

    public async changePassword(id: string, newPassword: ChangePasswordDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}/password`;
        const rawResponse = await this.api.patch<SuccessResponse, ChangePasswordDto>(url, newPassword);

        return this.validationNullInformation(rawResponse);
    }

    public async changeStateActive(id: string): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}/state`;
        const rawResponse = await this.api.post<SuccessResponse, {}>(url, {});

        return this.validationNullInformation(rawResponse);
    }

    public async findById(id: string): Promise<SuccessResponse<UserEntity>> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await this.api.get<SuccessResponse<UserEntity>>(url);

        const entity = UserMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: entity
        };
    }

    public async findAll(): Promise<SuccessResponse<UserEntity[]>> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.api.get<SuccessResponse<UserEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No users found");
        }

        const entities = rawResponse.data.map((user) => UserMapper.toEntity(user));

        return {
            ...rawResponse,
            data: entities
        };
    }

    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        return UserMapper.validationNullInformation(rawResponse);
    }
}