import { CreateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { SuccessResponse } from "@salc/core/interfaces";
import { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository";


interface CreateModuleUseCase {
    execute(module: CreateModuleDto): Promise<SuccessResponse>
}

export class CreateModuleUseCaseImpl implements CreateModuleUseCase {
    constructor(
        private readonly moduleRepository: ModuleRepositoryImpl
    ) { }

    async execute(module: CreateModuleDto): Promise<SuccessResponse> {
        return this.moduleRepository.createModule(module);
    }
}