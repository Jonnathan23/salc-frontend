import { CustomError } from "@salc/core/enums";
import { StudentDataSource } from "../../domain/datasources/Student.datasource";
import { RegisterStudentDto, UpdateStudentDto, ChangeContractStatusDto } from "../../domain/dtos";
import { StudentEntity } from "../../domain/entities/Student.entity";
import { StudentMapper } from "../mappers/Student.mapper";
import { SuccessResponse } from "@salc/core/interfaces";
import { apiSalc } from "@salc/core/lib";

export class StudentRepositoryImpl implements StudentDataSource {
    private readonly baseUrl = '/students';

    async register(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/register`;
        const rawResponse = await apiSalc.post<SuccessResponse<StudentEntity>, RegisterStudentDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not register student");
        }

        const student = StudentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async search(query: string): Promise<SuccessResponse<StudentEntity[]>> {
        const url = `${this.baseUrl}/search?q=${query}`;
        const rawResponse = await apiSalc.get<SuccessResponse<StudentEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No students found");
        }

        const students = StudentMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: students
        };
    }

    async update(id: string, dto: UpdateStudentDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await apiSalc.patch<SuccessResponse<StudentEntity>, UpdateStudentDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not update student");
        }

        const student = StudentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async changeContractStatus(id: string, dto: ChangeContractStatusDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/contract-status`;
        const rawResponse = await apiSalc.patch<SuccessResponse<StudentEntity>, ChangeContractStatusDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not change contract status");
        }

        const student = StudentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async toggleGraduated(id: string): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/graduated`;
        const rawResponse = await apiSalc.patch<SuccessResponse<StudentEntity>, null>(url, null);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not toggle graduated status");
        }

        const student = StudentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }

    async deactivate(id: string): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/deactivate`;
        const rawResponse = await apiSalc.patch<SuccessResponse<StudentEntity>, null>(url, null);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not deactivate student");
        }

        const student = StudentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student
        };
    }
}
