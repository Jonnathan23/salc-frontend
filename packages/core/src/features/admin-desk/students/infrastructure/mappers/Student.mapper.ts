import { CustomError } from "@salc/core/enums";
import { StudentEntity } from "../../domain/entities/Student.entity";
import { studentSchema, arrayStudentsSchema } from "../schemas/Student.schema";
import { SuccessResponse } from "@salc/core/interfaces";
import { DataAccessLayerAdapter } from "@salc/core/adapters";

type StudentMapperProps = Record<string, unknown> | unknown | null | undefined;

export const StudentMapper = {
    toEntity(rawObject: StudentMapperProps): StudentEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student data is missing");
        }

        const validationResponse = DataAccessLayerAdapter.validateData(studentSchema, rawObject);

        return new StudentEntity(
            validationResponse.id,
            validationResponse.identificationCard,
            validationResponse.fullName,
            validationResponse.phoneNumber,
            validationResponse.email,
            new Date(validationResponse.dateOfBirth),
            validationResponse.nationality,
            validationResponse.certificateType,
            new Date(validationResponse.startDate),
            validationResponse.isGraduated,
            validationResponse.contractStatus as any,
            validationResponse.progressCategory as any,
            new Date(validationResponse.createdAt),
            new Date(validationResponse.updatedAt)
        );
    },

    toArrayEntities(rawObjects: StudentMapperProps[]): StudentEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Students data is missing");
        }

        const validationResponse = DataAccessLayerAdapter.validateData(arrayStudentsSchema, rawObjects);

        return validationResponse.map((student: any) => this.toEntity(student));
    },

    validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        const responseSchema = DataAccessLayerAdapter.buildSuccessResponseSchema();
        const validationResponse = DataAccessLayerAdapter.validateData(responseSchema, rawResponse);

        return validationResponse;
    }
}
