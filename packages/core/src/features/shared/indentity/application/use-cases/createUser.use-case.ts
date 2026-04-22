import { UserDataSource } from "@salc/core/features/shared/indentity/domain/datasource";
import type { RegisterUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import type { SuccessResponse } from "@salc/core/interfaces";



interface CreateUserUseCase {
    execute(userDto: RegisterUserDto): Promise<SuccessResponse>;
}


export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(private readonly userRepository: UserDataSource) { }

    async execute(userDto: RegisterUserDto): Promise<SuccessResponse> {
        return await this.userRepository.create(userDto);
    }
}


