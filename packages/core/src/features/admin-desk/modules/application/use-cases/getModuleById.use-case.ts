import type { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository.impl";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

interface GetModuleByIdUseCase {
    execute(moduleId: string): Promise<SuccessResponse<ModuleEntity>>;
}

export class GetModuleByIdUseCaseImpl implements GetModuleByIdUseCase {
    constructor(private readonly moduleRepository: ModuleRepositoryImpl) {}

    async execute(moduleId: string): Promise<SuccessResponse<ModuleEntity>> {
        return this.moduleRepository.getModuleById(moduleId);
    }
}
