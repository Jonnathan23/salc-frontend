import { CustomError } from "@salc/core/enums";
import type { StudentLevelDataSource } from "@salc/core/features/admin-desk/students-level/domain/datasource/student-level.datasource";
import type { PurchaseModulesDto, UpdateStudentModuleDto } from "@salc/core/features/admin-desk/students-level/domain/dtos";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { StudentLevelDetailsEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevelDetails.entity";
import type { StudentLevelDetailsMapper } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/student-level-details.mapper";
import type { StudentLevelMapper } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/student-level.mapper";
import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";
import type { BackendResponseProps } from "@salc/core/types/BackendResponse.type";


export class StudentLevelDataSourceImpl implements StudentLevelDataSource {
    private readonly baseUrl = '/student-levels';

    constructor(
        private readonly api: MethodsHttp,
        private readonly studentLevelMapper: StudentLevelMapper,
        private readonly studentLevelDatailsMapper: StudentLevelDetailsMapper
    ) { }

    async purchaseModules(dto: PurchaseModulesDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        const targetUrl = `${this.baseUrl}/student/${dto.studentId}`;
        const rawResponse = await this.api.post<SuccessResponse<BackendResponseProps[]>, PurchaseModulesDto>(targetUrl, dto);

        if (!rawResponse.data) {
            throw CustomError.badRequest("Failed to purchase modules");
        }

        const studentLevels = this.studentLevelMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: studentLevels
        };


    }

    async getStudentContracts(studentId: string): Promise<SuccessResponse<StudentLevelDetailsEntity[]>> {
        const targetUrl = `${this.baseUrl}/student/${studentId}`;
        const rawResponse = await this.api.get<SuccessResponse<BackendResponseProps[]>>(targetUrl);

        if(!rawResponse.data) {
            throw CustomError.notFound("Student level data is missing");
        }

        const studentDetailsLevels = this.studentLevelDatailsMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: studentDetailsLevels
        };


    }

    async updateStudentLevel(dto: UpdateStudentModuleDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        const targetUrl = `${this.baseUrl}/${dto.contractId}/status`;
        const rawResponse = await this.api.patch<SuccessResponse<BackendResponseProps[]>, UpdateStudentModuleDto>(targetUrl, dto);

        if (!rawResponse.data) {
            throw CustomError.badRequest("Failed to update student level");
        }

        const studentLevels = this.studentLevelMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: studentLevels
        };


    }

    async deleteStudentLevel(studentLevelId: string): Promise<SuccessResponse<void>> {
        const targetUrl = `${this.baseUrl}/${studentLevelId}`;
        return await this.api.delete<SuccessResponse<void>>(targetUrl);
    }
}