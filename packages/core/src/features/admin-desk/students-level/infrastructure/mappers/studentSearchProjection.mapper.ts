import { CustomError } from "@salc/core/enums";
import { StudentSearchProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentSearchProjection.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import type { BackendResponseProps } from "@salc/core/types/BackendResponse.type";

export interface StudentSearchProjectionMapper {
    toEntity(rawObject: BackendResponseProps): StudentSearchProjectionEntity;
    toArrayEntities(rawObjects: BackendResponseProps[]): StudentSearchProjectionEntity[];
}

export class StudentSearchProjectionMapperImpl implements StudentSearchProjectionMapper {
    constructor(
        private readonly validator: EntityValidator<StudentSearchProjectionEntity>,
        private readonly arrayValidator: EntityValidator<StudentSearchProjectionEntity[]>,
    ) {}

    toEntity(rawObject: BackendResponseProps): StudentSearchProjectionEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student search data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        return new StudentSearchProjectionEntity(
            validationResponse.id,
            validationResponse.identificationCard,
            validationResponse.fullName,
            validationResponse.email,
            validationResponse.totalEnrolledLevels,
        );
    }

    toArrayEntities(rawObjects: BackendResponseProps[]): StudentSearchProjectionEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Students search data is missing");
        }

        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map((item: any) => this.toEntity(item));
    }
}
