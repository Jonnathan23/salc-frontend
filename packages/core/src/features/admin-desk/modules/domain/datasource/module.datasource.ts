import { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { SuccessResponse } from "@salc/core/interfaces";


export abstract class ModuleDataSource {
    abstract getAllModules(): Promise<SuccessResponse<ModuleEntity[]>>
    abstract getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>>
    abstract createModule(module: CreateModuleDto): Promise<SuccessResponse>
    abstract updateModule(id: string, module: UpdateModuleDto): Promise<SuccessResponse>
    abstract deleteModule(id: string): Promise<SuccessResponse>
}