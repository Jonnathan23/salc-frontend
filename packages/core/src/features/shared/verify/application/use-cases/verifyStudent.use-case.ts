import type { SuccessResponse } from "@salc/core/interfaces";
import type { VerifyRepository } from "@salc/core/features/shared/verify/domain/repositories/verify.repository";
import type { StudentTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";

export class VerifyStudentUseCase {
    constructor(private readonly verifyRepository: VerifyRepository) {}

    async execute(): Promise<SuccessResponse<StudentTokenPayloadEntity>> {
        return await this.verifyRepository.verifyStudent();
    }
}
