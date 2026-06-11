import { CustomError } from "@salc/core/enums";
import { StudentClassTrackEntity } from "@salc/core/features/class-track-teachers/students/domain/entities/StudentClassTrack.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

type StudentClassTrackMapperProps = Record<string, any> | unknown | null | undefined;

export interface StudentMapperClassTrack {
    toEntity(rawObject: StudentClassTrackMapperProps): StudentClassTrackEntity;
    toArrayEntities(rawObjects: StudentClassTrackMapperProps[]): StudentClassTrackEntity[];
}

export class StudentMapperClassTrackImpl implements StudentMapperClassTrack {
    constructor(
        private readonly validator: EntityValidator<StudentClassTrackEntity>,
        private readonly arrayValidator: EntityValidator<StudentClassTrackEntity[]>,
    ) {}

    toEntity(rawObject: StudentClassTrackMapperProps): StudentClassTrackEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        return new StudentClassTrackEntity(
            validationResponse.studentId,
            validationResponse.identificationCard,
            validationResponse.fullName,
        );
    }

    toArrayEntities(rawObjects: StudentClassTrackMapperProps[]): StudentClassTrackEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Students data is missing");
        }

        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map(
            (student) => new StudentClassTrackEntity(student.studentId, student.identificationCard, student.fullName),
        );
    }
}
