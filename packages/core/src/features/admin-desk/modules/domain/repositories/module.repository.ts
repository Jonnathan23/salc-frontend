import type { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { SuccessResponse } from "@salc/core/interfaces";


export abstract class ModuleRepository {
    abstract getAllModules(): Promise<SuccessResponse<ModuleEntity[]>>
    abstract getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>>
    abstract createModule(module: CreateModuleDto): Promise<SuccessResponse>
    abstract updateModule(id: string, module: UpdateModuleDto): Promise<SuccessResponse>
    abstract deleteModule(id: string): Promise<SuccessResponse>
}
