import { SuccessResponse } from "@salc/core/interfaces";
import { UserAuthResponseEntity } from "../../domain/entities";
import { UserRepository } from "../../infrastructure/repositories/user.repository";


interface GetAllUsersUseCase {
    execute(): Promise<SuccessResponse<UserAuthResponseEntity[]>>;
}


export class GetAllUsersUseCaseImpl implements GetAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<SuccessResponse<UserAuthResponseEntity[]>> {
        return await this.userRepository.findAll();
    }
}