import { nullResponseValidator, validatorFactory } from "@salc/core/adapters";
import { UpdateUserUseCaseImpl } from "@salc/core/features/admin-desk/modules/application/use-cases";
import { CreateUserUseCaseImpl, FindUserByIdUseCaseImpl, GetAllUsersUseCaseImpl, LoginUserUseCaseImpl } from "@salc/core/features/shared/identity/application";
import { ChangeUserStateUseCaseImpl } from "@salc/core/features/shared/identity/application/use-cases/changeUserState.use-case";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/identity/domain/entities";
import { UserDataSourceImpl } from "@salc/core/features/shared/identity/infrastructure/datasources/user.datasource.impl";
import { UserAuthResponseMapperImpl } from "@salc/core/features/shared/identity/infrastructure/mappers/userAuthResponse.mapper";
import { UserRepositoryImpl } from "@salc/core/features/shared/identity/infrastructure/repositories/user.repository.impl";
import { userAuthResponseSchema } from "@salc/core/features/shared/identity/infrastructure/schemas";
import { api } from "@salc/core/lib";

//* Mappers
const userAuthValidator = validatorFactory.createValidator<UserAuthResponseEntity>(userAuthResponseSchema);

// Inyectamos el validador al Mapper
export const userAuthMapper = new UserAuthResponseMapperImpl(userAuthValidator);

//* Datasources
export const userDataSource = new UserDataSourceImpl(api, nullResponseValidator, userAuthMapper);

//* Repositories
export const userRepository = new UserRepositoryImpl(userDataSource);


//* Use Cases
export const createUserUseCase = new CreateUserUseCaseImpl(userRepository);

export const loginUserUseCase = new LoginUserUseCaseImpl(userRepository);

export const getAllUsersUseCase = new GetAllUsersUseCaseImpl(userRepository);

export const updateUserUseCase = new UpdateUserUseCaseImpl(userRepository);

export const findUserByIdUseCase = new FindUserByIdUseCaseImpl(userRepository);

export const changeUserStateUseCase = new ChangeUserStateUseCaseImpl(userRepository);