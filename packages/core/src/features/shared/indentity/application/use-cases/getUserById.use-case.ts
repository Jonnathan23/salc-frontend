import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentity/domain/entities";
import type { UserRepository } from "@salc/core/features/shared/indentity/domain/repository/user.repository";
import type { SuccessResponse } from "@salc/core/interfaces";



interface FindUserByIdUseCase {
    execute(id: string): Promise<SuccessResponse<UserAuthResponseEntity>>;
}

export class FindUserByIdUseCaseImpl implements FindUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    execute(id: string): Promise<SuccessResponse<UserAuthResponseEntity>> {
        return this.userRepository.findById(id);
    }
}