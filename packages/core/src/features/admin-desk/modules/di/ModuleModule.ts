import { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository";
import { GetAllModulesUseCaseImpl, GetModuleByIdUseCaseImpl, CreateModuleUseCaseImpl, UpdateModuleUseCaseImpl } from "@salc/core/features/admin-desk/modules/application";
import { api } from "@salc/core/lib";


//* Repositories
export const moduleRepository = new ModuleRepositoryImpl(api);


//* Use Cases
export const getAllModulesUseCase = new GetAllModulesUseCaseImpl(moduleRepository);
export const getModuleByIdUseCase = new GetModuleByIdUseCaseImpl(moduleRepository);
export const createModuleUseCase = new CreateModuleUseCaseImpl(moduleRepository);
export const updateModuleUseCase = new UpdateModuleUseCaseImpl(moduleRepository);