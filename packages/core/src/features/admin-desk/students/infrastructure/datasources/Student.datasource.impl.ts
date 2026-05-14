import type { RegisterStudentDto, UpdateStudentDto, ChangeContractStatusDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import { type StudentMapper } from "@salc/core/features/admin-desk/students/infrastructure/mappers/Student.mapper";
import { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/Student.datasource";
import { type StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { type SuccessResponse, type MethodsHttp } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";


export class StudentDataSourceImpl implements StudentDataSource {
    private readonly baseUrl = '/students';

    constructor(
        private readonly apiStudents: MethodsHttp,
        private readonly studentMapper: StudentMapper,
    ) { }

    async register(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/register`;
        const rawResponse = await this.apiStudents.post<SuccessResponse<StudentEntity>, RegisterStudentDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not register student");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async search(query: string): Promise<SuccessResponse<StudentEntity[]>> {
        const url = `${this.baseUrl}/search?q=${query}`;
        const rawResponse = await this.apiStudents.get<SuccessResponse<StudentEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No students found");
        }

        const students = this.studentMapper.toArrayEntities(rawResponse.data);
        return {
            ...rawResponse,
            data: students
        };
    }

    async getAllStudents(): Promise<SuccessResponse<StudentEntity[]>> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.apiStudents.get<SuccessResponse<StudentEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No students found");
        }
        
        const students = this.studentMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: students
        };
    }

    async update(id: string, dto: UpdateStudentDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, UpdateStudentDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not update student");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async changeContractStatus(id: string, dto: ChangeContractStatusDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/contract-status`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, ChangeContractStatusDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not change contract status");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async toggleGraduated(id: string): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/graduated`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, null>(url, null);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not toggle graduated status");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async deactivate(id: string): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/deactivate`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, null>(url, null);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not deactivate student");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }
}
