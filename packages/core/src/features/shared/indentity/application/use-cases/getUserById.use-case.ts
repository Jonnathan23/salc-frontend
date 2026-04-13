import { SuccessResponse } from "@salc/core/interfaces";
import { UserAuthResponseEntity } from "../../domain/entities";
import { UserDataSource } from "../../domain/datasource";


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