import { ModuleRepository } from "@salc/core/features/admin-desk/modules/domain/repositories/module.repository";
import { ModuleDataSource } from "@salc/core/features/admin-desk/modules/domain/datasource/module.datasource";
import type { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { type SuccessResponse } from "@salc/core/interfaces";

export class ModuleRepositoryImpl implements ModuleRepository {
    constructor(private readonly moduleDataSource: ModuleDataSource) {}

    getAllModules(): Promise<SuccessResponse<ModuleEntity[]>> {
        return this.moduleDataSource.getAllModules();
    }

    getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>> {
        return this.moduleDataSource.getModuleById(moduleId);
    }

    createModule(module: CreateModuleDto): Promise<SuccessResponse> {
        return this.moduleDataSource.createModule(module);
    }

    updateModule(id: string, module: UpdateModuleDto): Promise<SuccessResponse> {
        return this.moduleDataSource.updateModule(id, module);
    }

    deleteModule(id: string): Promise<SuccessResponse> {
        return this.moduleDataSource.deleteModule(id);
    }
}
