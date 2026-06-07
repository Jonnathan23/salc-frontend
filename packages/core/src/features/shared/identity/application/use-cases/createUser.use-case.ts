import type { RegisterUserDto } from "@salc/core/features/shared/identity/domain/dtos";
import type { UserRepository } from "@salc/core/features/shared/identity/domain/repository/user.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

interface CreateUserUseCase {
    execute(userDto: RegisterUserDto): Promise<SuccessResponse>;
}

export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userDto: RegisterUserDto): Promise<SuccessResponse> {
        return await this.userRepository.create(userDto);
    }
}
