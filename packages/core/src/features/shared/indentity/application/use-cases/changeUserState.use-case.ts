import type { UserRepository } from "@salc/core/features/shared/indentity/infrastructure/repositories/user.repository";
import type { SuccessResponse } from "@salc/core/interfaces";



interface ChangeStateUseCase {
    execute(id: string): Promise<SuccessResponse>;
}

export class ChangeStateUseCaseImpl implements ChangeStateUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    execute(id: string): Promise<SuccessResponse> {
        return this.userRepository.changeStateActive(id);
    }
}