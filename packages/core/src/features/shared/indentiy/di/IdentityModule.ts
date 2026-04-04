import { UpdateUserUseCaseImpl } from "@salc/core/features/admin-desk/modules/application";
import { CreateUserUseCaseImpl, FindUserByIdUseCaseImpl, GetAllUsersUseCaseImpl, LoginUserUseCaseImpl } from "@salc/core/features/shared/indentiy/application";
import { UserRepository } from "@salc/core/features/shared/indentiy/infrastructure/repositories/user.repository";
import { ChangeStateUseCaseImpl } from "@salc/core/features/shared/indentiy/application/use-cases/changeUserState.use-case";

//* Repositories
export const userRepository = new UserRepository();

//* Use Cases
export const createUserUseCase = new CreateUserUseCaseImpl(userRepository);

export const loginUserUseCase = new LoginUserUseCaseImpl(userRepository);

export const updateUserUseCase = new UpdateUserUseCaseImpl(userRepository);

export const changeUserStateUseCase = new ChangeStateUseCaseImpl(userRepository);

export const getAllUsersUseCase = new GetAllUsersUseCaseImpl(userRepository);

export const findUserByIdUseCase = new FindUserByIdUseCaseImpl(userRepository);