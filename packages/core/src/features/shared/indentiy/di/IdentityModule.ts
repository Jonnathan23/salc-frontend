import { CreateUserUseCaseImpl, LoginUserUseCaseImpl } from "@salc/core/features/shared/indentiy/application";
import { UserRepository } from "@salc/core/features/shared/indentiy/infrastructure/repositories/user.repository";
import { api } from "@salc/core/lib";

//* Repositories
export const userRepository = new UserRepository(api);

//* Use Cases
export const createUserUseCase = new CreateUserUseCaseImpl(userRepository);

export const loginUserUseCase = new LoginUserUseCaseImpl(userRepository);