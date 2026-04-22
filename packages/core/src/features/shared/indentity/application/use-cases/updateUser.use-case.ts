import { UserDataSource } from "@salc/core/features/shared/indentity/domain/datasource";
import type { UpdateUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import type { SuccessResponse } from "@salc/core/interfaces";


interface UpdateUserUseCase {
    execute(id: string, user: UpdateUserDto): Promise<SuccessResponse>;
}

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    constructor(
        private readonly userDataSource: UserDataSource
    ) { }

    execute(id: string, user: UpdateUserDto): Promise<SuccessResponse> {
        return this.userDataSource.update(id, user);
    }
}