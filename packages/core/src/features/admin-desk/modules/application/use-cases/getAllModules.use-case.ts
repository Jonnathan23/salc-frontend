import type { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository.impl";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

interface GetAllModulesUseCase {
    execute(): Promise<SuccessResponse<ModuleEntity[]>>;
}

export class GetAllModulesUseCaseImpl implements GetAllModulesUseCase {
    constructor(private readonly moduleRepository: ModuleRepositoryImpl) {}

    async execute(): Promise<SuccessResponse<ModuleEntity[]>> {
        return this.moduleRepository.getAllModules();
    }
}
