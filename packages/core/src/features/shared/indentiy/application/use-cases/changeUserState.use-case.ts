import { SuccessResponse } from "@salc/core/interfaces";
import { UserRepository } from "@salc/core/features/shared/indentiy/infrastructure/repositories/user.repository";


interface ChangeStateUseCase {
    execute(id: string): Promise<SuccessResponse>;
}

export class ChangeStateUseCaseImpl implements ChangeStateUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    execute(id: string): Promise<SuccessResponse> {
        return this.userRepository.changeStateActive(id);
    }
}