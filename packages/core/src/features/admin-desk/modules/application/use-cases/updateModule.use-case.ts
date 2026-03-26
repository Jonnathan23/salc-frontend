import { UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { SuccessResponse } from "@salc/core/interfaces";
import { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository";

interface UpdateModuleUseCase {
    execute(id: string, module: UpdateModuleDto): Promise<SuccessResponse>
}

export class UpdateModuleUseCaseImpl implements UpdateModuleUseCase {
    constructor(
        private readonly moduleRepository: ModuleRepositoryImpl
    ) { }

    async execute(id: string, module: UpdateModuleDto): Promise<SuccessResponse> {
        return this.moduleRepository.updateModule(id, module);
    }
}