import { CustomError } from "@salc/core/enums";
import { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import type { BackendResponseProps } from "@salc/core/types/BackendResponse.type";



export interface StudentLevelMapper {
    toEntity(rawObject: BackendResponseProps): StudentLevelEntity;
    toArrayEntities(rawObjects: BackendResponseProps): StudentLevelEntity[];
}

export class StudentLevelMapperImpl implements StudentLevelMapper {
    constructor(
        private readonly validator: EntityValidator<StudentLevelEntity>,
        private readonly arrayValidator: EntityValidator<StudentLevelEntity[]>,
    ) { }

    toEntity(rawObject: BackendResponseProps): StudentLevelEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student level data is missing");
        }

        console.log(rawObject);
        const validationResponse = this.validator.validate(rawObject);

        // Transforma los datos crudos en una entidad pura de dominio
        return new StudentLevelEntity(
            validationResponse.id,
            validationResponse.studentId,
            validationResponse.moduleId,
            validationResponse.sellerId,
            validationResponse.status as StudentModuleStatus,
            new Date(validationResponse.purchaseDate),
            new Date(validationResponse.createdAt),
            new Date(validationResponse.updatedAt)
        );
    }

    toArrayEntities(rawObjects: BackendResponseProps[]): StudentLevelEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Student level data is missing");
        }

        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse;
    }

}
