import { CustomError } from "@salc/core/enums";
import { StudentEntity } from "../../domain/entities/Student.entity";
import { type EntityValidator } from "@salc/core/interfaces/EntityValidator";


type StudentMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface StudentMapper {
    toEntity(rawObject: StudentMapperProps): StudentEntity;
    toArrayEntities(rawObjects: StudentMapperProps[]): StudentEntity[];
}

export class StudentMapperImpl implements StudentMapper {

    constructor(
        private readonly validator: EntityValidator<StudentEntity>,
        private readonly arrayValidator: EntityValidator<StudentEntity[]>,
    ) { }

    toEntity(rawObject: StudentMapperProps): StudentEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

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
    }

    toArrayEntities(rawObjects: StudentMapperProps[]): StudentEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Students data is missing");
        }
        
        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map((student: any) => this.toEntity(student));
    }
}
