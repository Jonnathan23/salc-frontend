import { nullResponseValidator, validatorFactory } from "@salc/core/adapters";
import { UpdateUserUseCaseImpl } from "@salc/core/features/admin-desk/modules/application";
import { CreateUserUseCaseImpl, FindUserByIdUseCaseImpl, GetAllUsersUseCaseImpl, LoginUserUseCaseImpl } from "@salc/core/features/shared/indentiy/application";
import { UserAuthResponseEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { UserAuthResponseMapper, UserAuthResponseMapperImpl } from "@salc/core/features/shared/indentiy/infrastructure/mappers/userAuthResponse.mapper";
import { UserRepository } from "@salc/core/features/shared/indentiy/infrastructure/repositories/user.repository";
import { userAuthResponseSchema } from "@salc/core/features/shared/indentiy/infrastructure/schemas";
import { api } from "@salc/core/lib";

//* Mappers
const userAuthValidator = validatorFactory.createValidator<UserAuthResponseEntity>(userAuthResponseSchema);

// Inyectamos el validador al Mapper
export const userAuthMapper = new UserAuthResponseMapperImpl(userAuthValidator);

//* Repositories
export const userRepository = new UserRepository(api, nullResponseValidator, userAuthMapper);

//* Use Cases
export const createUserUseCase = new CreateUserUseCaseImpl(userRepository);

export const loginUserUseCase = new LoginUserUseCaseImpl(userRepository);

export const getAllUsersUseCase = new GetAllUsersUseCaseImpl(userRepository);

export const updateUserUseCase = new UpdateUserUseCaseImpl(userRepository);

export const findUserByIdUseCase = new FindUserByIdUseCaseImpl(userRepository);