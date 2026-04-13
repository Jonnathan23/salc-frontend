import { GetAllModulesUseCaseImpl, GetModuleByIdUseCaseImpl, CreateModuleUseCaseImpl, UpdateModuleUseCaseImpl } from "@salc/core/features/admin-desk/modules/application";
import { arrayModulesSchema, moduleSchema } from "@salc/core/features/admin-desk/modules/infrastructure/schemas/module.schema";
import { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository";
import { ModuleMapperImpl } from "@salc/core/features/admin-desk/modules/infrastructure/mapper/module.mapper";
import { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { nullResponseValidator, validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* validators

const moduleValidator = validatorFactory.createValidator<ModuleEntity>(moduleSchema);
const arrayModuleValidator = validatorFactory.createValidator<ModuleEntity[]>(arrayModulesSchema);

//* Mappers
export const moduleMapper = new ModuleMapperImpl(
    moduleValidator,
    arrayModuleValidator
);

//* Repositories
export const moduleRepository = new ModuleRepositoryImpl(api, moduleMapper, nullResponseValidator);


//* Use Cases
export const getAllModulesUseCase = new GetAllModulesUseCaseImpl(moduleRepository);

export const getModuleByIdUseCase = new GetModuleByIdUseCaseImpl(moduleRepository);

export const createModuleUseCase = new CreateModuleUseCaseImpl(moduleRepository);

export const updateModuleUseCase = new UpdateModuleUseCaseImpl(moduleRepository);