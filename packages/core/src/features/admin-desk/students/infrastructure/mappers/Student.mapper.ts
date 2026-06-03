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
    ) {}

    private parseLocalDate(dateValue: string | Date): Date {
        if (dateValue instanceof Date) {
            if (isNaN(dateValue.getTime())) return new Date();
            return new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate());
        }

        const dateString = String(dateValue);
        const datePart = dateString.substring(0, 10);

        if (!datePart.includes("-")) {
            return new Date(dateString);
        }

        const [year, month, day] = datePart.split("-").map(Number);

        return new Date(year, month - 1, day);
    }

    toEntity(rawObject: StudentMapperProps): StudentEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        const parsedDateOfBirth = this.parseLocalDate(validationResponse.dateOfBirth);
        const parsedStartDate = this.parseLocalDate(validationResponse.startDate);

        return new StudentEntity(
            validationResponse.id,
            validationResponse.identificationCard,
            validationResponse.fullName,
            validationResponse.phoneNumber,
            validationResponse.email,
            parsedDateOfBirth,
            validationResponse.nationality,
            validationResponse.certificateType,
            parsedStartDate,
            validationResponse.isGraduated,
            validationResponse.contractStatus as any,
            validationResponse.progressCategory as any,
            new Date(validationResponse.createdAt),
            new Date(validationResponse.updatedAt),
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
