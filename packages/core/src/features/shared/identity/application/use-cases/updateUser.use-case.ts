import type { UpdateUserDto } from "@salc/core/features/shared/identity/domain/dtos";
import type { UserRepository } from "@salc/core/features/shared/identity/domain/repository/user.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

interface UpdateUserUseCase {
    execute(id: string, user: UpdateUserDto): Promise<SuccessResponse>;
}

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    constructor(private readonly userDataSource: UserRepository) {}

    execute(id: string, user: UpdateUserDto): Promise<SuccessResponse> {
        return this.userDataSource.update(id, user);
    }
}
