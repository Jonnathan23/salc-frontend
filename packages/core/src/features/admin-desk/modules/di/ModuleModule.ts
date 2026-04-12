import { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository";
import { GetAllModulesUseCaseImpl, GetModuleByIdUseCaseImpl, CreateModuleUseCaseImpl, UpdateModuleUseCaseImpl } from "@salc/core/features/admin-desk/modules/application";
<<<<<<< HEAD
import { api } from "@salc/core/lib";
=======
import { UpdateUserUseCaseImpl } from "@salc/core/features/shared/indentiy/application/use-cases/updateUser.use-case";
>>>>>>> 79681374fcc3e0f277c1b034ac7e7cbf70159573


//* Repositories
export const moduleRepository = new ModuleRepositoryImpl(api);


//* Use Cases
export const getAllModulesUseCase = new GetAllModulesUseCaseImpl(moduleRepository);
export const getModuleByIdUseCase = new GetModuleByIdUseCaseImpl(moduleRepository);
export const createModuleUseCase = new CreateModuleUseCaseImpl(moduleRepository);
export const updateModuleUseCase = new UpdateModuleUseCaseImpl(moduleRepository);