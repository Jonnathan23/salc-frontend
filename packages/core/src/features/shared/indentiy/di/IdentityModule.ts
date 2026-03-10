import { CreateUserUseCaseImpl } from "@salc/core/features/shared/indentiy/application/use-cases/createUser.use-case";
import { UserRepository } from "@salc/core/features/shared/indentiy/infrastructure/repositories/user.repository";

//* Repositories
export const userRepository = new UserRepository();

//* Use Cases
export const createUserUseCase = new CreateUserUseCaseImpl(userRepository);