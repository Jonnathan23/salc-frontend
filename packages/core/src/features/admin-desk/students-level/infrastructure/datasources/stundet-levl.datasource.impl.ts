import type { StudentLevelDataSource } from "@salc/core/features/admin-desk/students-level/domain/datasource/student-level.datasource";
import type { PurchaseModulesDto, UpdateStudentModuleDto } from "@salc/core/features/admin-desk/students-level/domain/dtos";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { StudentLevelMapper, StudentLevelMapperProps } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/student-level.mapper";
import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";


export class StudentLevelDataSourceImpl implements StudentLevelDataSource {
    private readonly baseUrl = '/contracts';

    constructor(
        private readonly api: MethodsHttp,
        private readonly studentLevelMapper: StudentLevelMapper
    ) { }

    private validationNullInformation<T>(response: SuccessResponse<T[]>): SuccessResponse<StudentLevelEntity[]> {
        if (!response.data || response.data.length === 0) {
            return {
                ...response,
                data: []
            };
        }

        return {
            ...response,
            data: (response.data as unknown as StudentLevelMapperProps[]).map(item => this.studentLevelMapper.toEntity(item))
        };
    }

    async purchaseModules(dto: PurchaseModulesDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        const targetUrl = `${this.baseUrl}/student/${dto.studentId}`;
        const rawResponse = await this.api.post<SuccessResponse<StudentLevelMapperProps[]>, PurchaseModulesDto>(targetUrl, dto);

        return this.validationNullInformation(rawResponse);
    }

    async getStudentContracts(studentId: string): Promise<SuccessResponse<StudentLevelEntity[]>> {
        const targetUrl = `${this.baseUrl}/student/${studentId}`;
        const rawResponse = await this.api.get<SuccessResponse<StudentLevelMapperProps[]>>(targetUrl);

        return this.validationNullInformation(rawResponse);
    }

    async updateStudentLevel(dto: UpdateStudentModuleDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        const targetUrl = `${this.baseUrl}/${dto.contractId}/status`;
        const rawResponse = await this.api.patch<SuccessResponse<StudentLevelMapperProps[]>, UpdateStudentModuleDto>(targetUrl, dto);

        return this.validationNullInformation(rawResponse);
    }

    async deleteStudentLevel(studentLevelId: string): Promise<SuccessResponse<void>> {
        const targetUrl = `${this.baseUrl}/${studentLevelId}`;
        return await this.api.delete<SuccessResponse<void>>(targetUrl);
    }
}