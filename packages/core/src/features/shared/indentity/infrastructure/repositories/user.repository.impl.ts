import type {
    ChangePasswordDto,
    LoginUserDto,
    RegisterUserDto,
    UpdateUserDto
} from '@salc/core/features/shared/indentity/domain/dtos';

import { type UserAuthResponseEntity } from '@salc/core/features/shared/indentity/domain/entities';
import { type UserDataSource } from '@salc/core/features/shared/indentity/domain/datasource';
import { type SuccessResponse } from '@salc/core/interfaces';
import { UserRepository } from '@salc/core/features/shared/indentity/domain/repository/user.repository';

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly userDataSource: UserDataSource) {}

    public create(user: RegisterUserDto): Promise<SuccessResponse> {
        return this.userDataSource.create(user);
    }

    public update(id: string, user: UpdateUserDto): Promise<SuccessResponse> {
        return this.userDataSource.update(id, user);
    }

    public login(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>> {
        return this.userDataSource.login(user);
    }

    public changePassword(id: string, newPassword: ChangePasswordDto): Promise<SuccessResponse> {
        return this.userDataSource.changePassword(id, newPassword);
    }

    public changeStateActive(id: string): Promise<SuccessResponse> {
        return this.userDataSource.changeStateActive(id);
    }

    public findById(id: string): Promise<SuccessResponse<UserAuthResponseEntity>> {
        return this.userDataSource.findById(id);
    }

    public findAll(): Promise<SuccessResponse<UserAuthResponseEntity[]>> {
        return this.userDataSource.findAll();
    }
}
