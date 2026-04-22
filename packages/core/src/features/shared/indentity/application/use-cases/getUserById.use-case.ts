import type { SuccessResponse } from "@salc/core/interfaces";
import type { UserAuthResponseEntity } from "../../domain/entities";
import type { UserDataSource } from "../../domain/datasource";


interface FindUserByIdUseCase {
    execute(id: string): Promise<SuccessResponse<UserAuthResponseEntity>>;
}

export class FindUserByIdUseCaseImpl implements FindUserByIdUseCase {
    constructor(
        private readonly userRepository: UserDataSource
    ) { }

    execute(id: string): Promise<SuccessResponse<UserAuthResponseEntity>> {
        return this.userRepository.findById(id);
    }
}