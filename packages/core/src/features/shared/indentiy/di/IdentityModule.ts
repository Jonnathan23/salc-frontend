import { CreateUserUseCaseImpl, GetAllUsersUseCaseImpl, LoginUserUseCaseImpl } from "@salc/core/features/shared/indentiy/application";
import { UserRepository } from "@salc/core/features/shared/indentiy/infrastructure/repositories/user.repository";

//* Repositories
export const userRepository = new UserRepository();

//* Use Cases
export const createUserUseCase = new CreateUserUseCaseImpl(userRepository);

export const loginUserUseCase = new LoginUserUseCaseImpl(userRepository);

export const getAllUsersUseCase = new GetAllUsersUseCaseImpl(userRepository);