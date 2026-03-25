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
        try {
            const rawResponse = await apiSalc.get<SuccessResponse<ModuleEntity[]>>(url);

            if (!rawResponse.data) {
                throw CustomError.notFound("No modules found");
            }

            const modules = ModuleMapper.toArrayEntities(rawResponse.data);

            const response: SuccessResponse<ModuleEntity[]> = {
                ...rawResponse,
                data: modules
            }

            return response;
        } catch (error) {
            this.handleError(error, "Error fetching modules");
        }
    }

    async getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>> {
        const url = `${this.baseUrl}/${moduleId}`;
        try {
            const rawResponse = await apiSalc.get<SuccessResponse<ModuleEntity>>(url);

            if (!rawResponse.data) {
                throw CustomError.notFound("No module found");
            }

            const module = ModuleMapper.toEntity(rawResponse.data);

            const response: SuccessResponse<ModuleEntity> = {
                ...rawResponse,
                data: module
            }

            return response;
        } catch (error) {
            this.handleError(error, "Error fetching module");
        }
    }

    async createModule(module: CreateModuleDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}`;
        try {
            const rawResponse = await apiSalc.post<SuccessResponse, CreateModuleDto>(url, module);

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            this.handleError(error, "Error creating module");
        }
    }

    async updateModule(id: string, module: UpdateModuleDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        try {
            const rawResponse = await apiSalc.patch<SuccessResponse, UpdateModuleDto>(url, module);

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            this.handleError(error, "Error updating module");
        }
    }
    
    async deleteModule(id: string): Promise<SuccessResponse> {
        const url = `${this.baseUrl}/${id}`;
        try {
            const rawResponse = await apiSalc.delete<SuccessResponse>(url);

            return this.validationNullInformation(rawResponse);
        } catch (error) {
            this.handleError(error, "Error deleting module");
        }
    }

    private validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        return ModuleMapper.validationNullInformation(rawResponse);
    }

    private handleError(error: unknown, fallbackMessage: string): never {
        if (error instanceof CustomError) {
            throw error;
        }
        throw CustomError.internalServer(fallbackMessage);
    }
}