import { CustomError } from "@salc/core/enums";
import { Validators } from "@salc/core/utils";

export class ChangePasswordDto {
    private constructor(public newPassword: string) {}

    static create(dto: ChangePasswordDto): ChangePasswordDto {
        const { newPassword } = dto;

        if (!newPassword) {
            throw CustomError.badRequest("New password is required");
        }

        if (!Validators.isStrongPassword) {
            throw CustomError.badRequest("Invalid password");
        }

        return new ChangePasswordDto(newPassword);
    }
}
