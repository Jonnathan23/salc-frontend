import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { RegisterUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";



interface CreateUserUseCase {
    execute(userDto: RegisterUserDto): Promise<string>;
}


export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(private readonly userRepository: UserDataSource) {}

    async execute(userDto: RegisterUserDto): Promise<string> {
        return await this.userRepository.create(userDto);
    }
}


