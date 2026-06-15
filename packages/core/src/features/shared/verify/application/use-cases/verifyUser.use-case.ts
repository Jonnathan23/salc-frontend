import type { SuccessResponse } from "@salc/core/interfaces";
import type { VerifyRepository } from "@salc/core/features/shared/verify/domain/repositories/verify.repository";
import type { UserTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/UserTokenPayload.model";

export class VerifyUserUseCase {
    constructor(private readonly verifyRepository: VerifyRepository) {}

    async execute(): Promise<SuccessResponse<UserTokenPayloadEntity>> {
        return await this.verifyRepository.verifyUser();
    }
}
