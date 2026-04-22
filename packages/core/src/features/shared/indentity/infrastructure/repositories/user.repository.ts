import { CustomError } from "@salc/core/enums";
import { type UserDataSource } from "@salc/core/features/shared/indentity/domain/datasource";
import type { ChangePasswordDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import { type UserAuthResponseEntity } from "@salc/core/features/shared/indentity/domain/entities";
import { type UserAuthResponseMapper } from "@salc/core/features/shared/indentity/infrastructure/mappers/userAuthResponse.mapper";
import { type SuccessResponse } from "@salc/core/interfaces";
import { type Api } from "@salc/core/interfaces/Apit.interface";
import { type EntityValidator } from "@salc/core/interfaces/EntityValidator";


export class UserRepository implements UserDataSource {

    private readonly baseUrl = '/user';

    /**
     * @param api - Api
     * @param nullResponseValidator - EntityValidator<SuccessResponse>
     * @param userAuthResponseMapper - UserAuthResponseMapper
     */
    constructor(
        private readonly api: Api,
        private readonly nullResponseValidator: EntityValidator<SuccessResponse>,
        private readonly userAuthResponseMapper: UserAuthResponseMapper
    ) { }

    public async create(user: RegisterUserDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.api.post<SuccessResponse, RegisterUserDto>(url, user);

        return this.validationNullInformation(rawResponse);
    }

    public async update(id: string, user: UpdateUserDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await this.api.patch<SuccessResponse, UpdateUserDto>(url, user);

        return this.validationNullInformation(rawResponse);
    }

    public async login(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>> {
        const url = `${this.baseUrl}/login`;
        const rawResponse = await this.api.post<SuccessResponse<UserAuthResponseEntity>, LoginUserDto>(url, user);

        if (!rawResponse.data) {
            throw CustomError.notFound("User data is missing");
        }

        // Utilizamos la instancia inyectada para mapear los datos
        const userLoginEntity = this.userAuthResponseMapper.toEntity(rawResponse.data);

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
        const rawResponse = await this.api.get<SuccessResponse<UserAuthResponseEntity>>(url);

        // Utilizamos la instancia inyectada
        const entity = this.userAuthResponseMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: entity
        };
    }

    public async findAll(): Promise<SuccessResponse<UserAuthResponseEntity[]>> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.api.get<SuccessResponse<UserAuthResponseEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No users found");
        }

        // Iteramos y mapeamos usando la instancia inyectada
        const entities = rawResponse.data.map((userRawData) => {
            return this.userAuthResponseMapper.toEntity(userRawData);
        });

        return {
            ...rawResponse,
            data: entities
        };
    }

    // Encapsulamos la validación de las respuestas nulas usando el validador inyectado
    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        return this.nullResponseValidator.validate(rawResponse);
    }
}