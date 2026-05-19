import { CustomError } from "@salc/core/enums";
import { ModuleDataSource } from "@salc/core/features/admin-desk/modules/domain/datasource/module.datasource";
import type { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { ModuleMapper } from "@salc/core/features/admin-desk/modules/infrastructure/mapper/module.mapper";
import type { SuccessResponse } from "@salc/core/interfaces";
import type { MethodsHttp } from "@salc/core/interfaces/Apit.interface";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

export class ModuleDataSourceImpl implements ModuleDataSource {
    private readonly baseUrl = "/modules";

    /**
     * @param api - Api
     * @param moduleMapper - ModuleMapper
     * @param nullResponseValidator - EntityValidator<SuccessResponse>
     */
    constructor(
        private readonly api: MethodsHttp,
        private readonly moduleMapper: ModuleMapper,
        private readonly nullResponseValidator: EntityValidator<SuccessResponse>,
    ) {}

    async getAllModules(): Promise<SuccessResponse<ModuleEntity[]>> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.api.get<SuccessResponse<ModuleEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No modules found");
        }

        const modules = this.moduleMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: modules,
        };
    }

    async getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>> {
        const url = `${this.baseUrl}/${moduleId}`;
        const rawResponse = await this.api.get<SuccessResponse<ModuleEntity>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No module found");
        }

        const module = this.moduleMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: module,
        };
    }

    async createModule(module: CreateModuleDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.api.post<SuccessResponse, CreateModuleDto>(url, module);

        return this.validationNullInformation(rawResponse);
    }

    async updateModule(id: string, module: UpdateModuleDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await this.api.patch<SuccessResponse, UpdateModuleDto>(url, module);

        return this.validationNullInformation(rawResponse);
    }

    async deleteModule(id: string): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await this.api.delete<SuccessResponse>(url);

        return this.validationNullInformation(rawResponse);
    }

    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        return this.nullResponseValidator.validate(rawResponse);
    }
}
