import type { LoginUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentity/domain/entities";
import type { UserRepository } from "@salc/core/features/shared/indentity/domain/repository/user.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

interface LoginUserUseCase {
    execute(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>>
}

export class LoginUserUseCaseImpl implements LoginUserUseCase {
    constructor(
        private readonly userDataSource: UserRepository
    ) { }

    execute(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>> {
        return this.userDataSource.login(user);
    }
}