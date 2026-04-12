import { CustomError } from "@salc/core/enums";
import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { ChangePasswordDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { UserAuthResponseEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { UserMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/user.mapper";
import { UserAuthResponseMapper } from "@salc/core/features/shared/indentiy/infrastructure/mappers/userAuthResponse.mapper";
import { SuccessResponse } from "@salc/core/interfaces";
<<<<<<< HEAD
import { Api } from "@salc/core/interfaces/Apit.interface";

=======
import { apiSalc } from "@salc/core/lib";
>>>>>>> 79681374fcc3e0f277c1b034ac7e7cbf70159573


export class UserRepository implements UserDataSource {

    private readonly baseUrl = '/user';
    constructor(private readonly api: Api) { }

    public async create(user: RegisterUserDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.api.post<SuccessResponse, RegisterUserDto>(url, user);

        return this.validationNullInformation(rawResponse);
    }

    public async update(id: string, user: UpdateUserDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await apiSalc.patch<SuccessResponse, UpdateUserDto>(url, user);

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

    public async findById(id: string): Promise<SuccessResponse<UserAuthResponseEntity>> {
        const url = `${this.baseUrl}/${id}`;
<<<<<<< HEAD
        const rawResponse = await this.api.get<SuccessResponse<UserEntity>>(url);
=======
        const rawResponse = await apiSalc.get<SuccessResponse<UserAuthResponseEntity>>(url);
>>>>>>> 79681374fcc3e0f277c1b034ac7e7cbf70159573

        const entity = UserAuthResponseMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: entity
        };
    }

    public async findAll(): Promise<SuccessResponse<UserAuthResponseEntity[]>> {
        const url = `${this.baseUrl}`;
<<<<<<< HEAD
        const rawResponse = await this.api.get<SuccessResponse<UserEntity[]>>(url);
=======
        const rawResponse = await apiSalc.get<SuccessResponse<UserAuthResponseEntity[]>>(url);
>>>>>>> 79681374fcc3e0f277c1b034ac7e7cbf70159573

        if (!rawResponse.data) {
            throw CustomError.notFound("No users found");
        }

        const entities = rawResponse.data.map((user) => UserAuthResponseMapper.toEntity(user));

        return {
            ...rawResponse,
            data: entities
        };
    }

    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        return UserMapper.validationNullInformation(rawResponse);
    }
}