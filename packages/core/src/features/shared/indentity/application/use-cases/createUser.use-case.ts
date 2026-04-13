import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { RegisterUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { SuccessResponse } from "@salc/core/interfaces";



interface CreateUserUseCase {
    execute(userDto: RegisterUserDto): Promise<SuccessResponse>;
}


export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(private readonly userRepository: UserDataSource) {}

    async execute(userDto: RegisterUserDto): Promise<SuccessResponse> {
        return await this.userRepository.create(userDto);
    }
}


