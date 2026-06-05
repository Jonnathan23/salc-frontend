import type { UserRepository } from "@salc/core/features/shared/identity/domain/repository/user.repository";
import type { SuccessResponse } from "@salc/core/interfaces";



interface ChangeUserStateUseCase {
    execute(id: string): Promise<SuccessResponse>;
}

export class ChangeUserStateUseCaseImpl implements ChangeUserStateUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    execute(id: string): Promise<SuccessResponse> {
        return this.userRepository.changeStateActive(id);
    }
}