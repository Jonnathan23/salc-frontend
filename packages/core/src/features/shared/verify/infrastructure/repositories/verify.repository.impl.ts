import type { SuccessResponse } from "@salc/core/interfaces";
import type { VerifyDataSource } from "@salc/core/features/shared/verify/domain/datasources/verify.datasource";
import type { VerifyRepository } from "@salc/core/features/shared/verify/domain/repositories/verify.repository";
import type { UserTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/UserTokenPayload.model";
import type { StudentTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";

export class VerifyRepositoryImpl implements VerifyRepository {
    constructor(private readonly dataSource: VerifyDataSource) {}

    async verifyUser(): Promise<SuccessResponse<UserTokenPayloadEntity>> {
        return this.dataSource.verifyUser();
    }

    async verifyStudent(): Promise<SuccessResponse<StudentTokenPayloadEntity>> {
        return this.dataSource.verifyStudent();
    }
}
