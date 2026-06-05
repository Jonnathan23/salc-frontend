import type { SuccessResponse } from '@salc/core/interfaces';
import type { UserAuthResponseEntity } from '@salc/core/features/shared/identity/domain/entities';
import type { UserRepository } from '@salc/core/features/shared/identity/domain/repository/user.repository';

interface GetAllUsersUseCase {
    execute(): Promise<SuccessResponse<UserAuthResponseEntity[]>>;
}

export class GetAllUsersUseCaseImpl implements GetAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<SuccessResponse<UserAuthResponseEntity[]>> {
        return await this.userRepository.findAll();
    }
}
