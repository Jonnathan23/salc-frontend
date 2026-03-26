import { SuccessResponse } from "@salc/core/interfaces";
import { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository";

interface GetModuleByIdUseCase {
    execute(moduleId: string): Promise<SuccessResponse<ModuleEntity>>
}

export class GetModuleByIdUseCaseImpl implements GetModuleByIdUseCase {
    constructor(
        private readonly moduleRepository: ModuleRepositoryImpl
    ) { }

    async execute(moduleId: string): Promise<SuccessResponse<ModuleEntity>> {
        return this.moduleRepository.getModuleById(moduleId);
    }
}