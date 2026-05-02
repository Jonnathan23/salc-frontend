import type { RegisterUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import type { UserRepository } from "@salc/core/features/shared/indentity/domain/repository/user.repository";
import type { SuccessResponse } from "@salc/core/interfaces";



interface CreateUserUseCase {
    execute(userDto: RegisterUserDto): Promise<SuccessResponse>;
}


export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userDto: RegisterUserDto): Promise<SuccessResponse> {
        return await this.userRepository.create(userDto);
    }
}


