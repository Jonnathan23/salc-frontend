import type { ChangePasswordDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentity/domain/entities";
import type { SuccessResponse } from "@salc/core/interfaces";


export abstract class UserDataSource {
    abstract create(user: RegisterUserDto): Promise<SuccessResponse>;
    abstract login(user: LoginUserDto): Promise<SuccessResponse<UserAuthResponseEntity>>;
    abstract update(id: string, user: UpdateUserDto): Promise<SuccessResponse>;
    abstract changePassword(id: string, newPassword: ChangePasswordDto): Promise<SuccessResponse>;
    abstract changeStateActive(id: string): Promise<SuccessResponse>;
    abstract findById(id: string): Promise<SuccessResponse<UserAuthResponseEntity>>;
    abstract findAll(): Promise<SuccessResponse<UserAuthResponseEntity[]>>;
}