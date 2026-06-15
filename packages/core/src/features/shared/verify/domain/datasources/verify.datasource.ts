import type { SuccessResponse } from "@salc/core/interfaces";
import type { UserTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/UserTokenPayload.model";
import type { StudentTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";

export abstract class VerifyDataSource {
    abstract verifyUser(): Promise<SuccessResponse<UserTokenPayloadEntity>>;
    abstract verifyStudent(): Promise<SuccessResponse<StudentTokenPayloadEntity>>;
}
