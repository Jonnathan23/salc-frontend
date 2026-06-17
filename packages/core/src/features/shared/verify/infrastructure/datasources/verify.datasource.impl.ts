import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";
import type { VerifyDataSource } from "@salc/core/features/shared/verify/domain/datasources/verify.datasource";
import type { UserTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/UserTokenPayload.model";
import type { StudentTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";
import type { VerifyMapper } from "@salc/core/features/shared/verify/infrastructure/mappers/verify.mapper";

export class VerifyDataSourceImpl implements VerifyDataSource {
    private readonly baseUrl = "/verify";

    constructor(
        private readonly api: MethodsHttp,
        private readonly verifyMapper: VerifyMapper,
    ) {}

    async verifyUser(): Promise<SuccessResponse<UserTokenPayloadEntity>> {
        const url = `${this.baseUrl}/user`;
        const rawResponse = await this.api.get<SuccessResponse<UserTokenPayloadEntity>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("User session not found");
        }

        const userPayload = this.verifyMapper.toUserTokenPayload(rawResponse.data);

        return {
            ...rawResponse,
            data: userPayload,
        };
    }

    async verifyStudent(): Promise<SuccessResponse<StudentTokenPayloadEntity>> {
        const url = `${this.baseUrl}/student`;
        const rawResponse = await this.api.get<SuccessResponse<StudentTokenPayloadEntity>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("Student session not found");
        }

        const studentPayload = this.verifyMapper.toStudentTokenPayload(rawResponse.data);

        return {
            ...rawResponse,
            data: studentPayload,
        };
    }
}
