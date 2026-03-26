import { CustomError } from "@salc/core/enums";
import { ModuleDataSource } from "@salc/core/features/admin-desk/modules/domain/datasource/module.datasource";
import { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { ModuleMapper } from "@salc/core/features/admin-desk/modules/infrastructure/mapper/module.mapper";
import { SuccessResponse } from "@salc/core/interfaces";
import { apiSalc } from "@salc/core/lib";

export class ModuleRepositoryImpl implements ModuleDataSource {
    private readonly baseUrl = '/modules';

    async getAllModules(): Promise<SuccessResponse<ModuleEntity[]>> {
        const url = `${this.baseUrl}`;
        const rawResponse = await apiSalc.get<SuccessResponse<ModuleEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No modules found");
        }

        const modules = ModuleMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: modules
        };
    }

    async getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>> {
        const url = `${this.baseUrl}/${moduleId}`;
        const rawResponse = await apiSalc.get<SuccessResponse<ModuleEntity>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No module found");
        }

        const module = ModuleMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: module
        };
    }

    async createModule(module: CreateModuleDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}`;
        const rawResponse = await apiSalc.post<SuccessResponse, CreateModuleDto>(url, module);

        return this.validationNullInformation(rawResponse);
    }

    async updateModule(id: string, module: UpdateModuleDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await apiSalc.patch<SuccessResponse, UpdateModuleDto>(url, module);

        return this.validationNullInformation(rawResponse);
    }

    async deleteModule(id: string): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await apiSalc.delete<SuccessResponse>(url);

        return this.validationNullInformation(rawResponse);
    }

    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        return ModuleMapper.validationNullInformation(rawResponse);
    }
}