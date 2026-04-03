import { UserDataSource } from "@salc/core/features/shared/indentiy/domain/datasource";
import { LoginUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { UserAuthResponseEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { SuccessResponse } from "@salc/core/interfaces";

interface LoginUserUseCase {
    execute(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>>
}

export class LoginUserUseCaseImpl implements LoginUserUseCase {
    constructor(
        private readonly userDataSource: UserDataSource
    ) { }

    execute(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>> {
        return this.userDataSource.login(user);
    }
}