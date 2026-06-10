import { CustomError } from "@salc/core/enums";

import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import { StudentLevelDetailsEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevelDetails.entity";
import type { BackendResponseProps } from "@salc/core/types/BackendResponse.type";
import { StudentLevelRelationMapper } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/studentLevelRelation.mapper";

export interface StudentLevelDetailsMapper {
    toEntity(rawObject: BackendResponseProps): StudentLevelDetailsEntity;
    toArrayEntities(rawObjects: BackendResponseProps[]): StudentLevelDetailsEntity[];
}

export class StudentLevelDetailsMapperImpl implements StudentLevelDetailsMapper {
    constructor(
        private readonly validatorDetails: EntityValidator<StudentLevelDetailsEntity>,
        private readonly arrayValidator: EntityValidator<StudentLevelDetailsEntity[]>,
    ) {}

    toEntity(rawObject: BackendResponseProps): StudentLevelDetailsEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student level data is missing");
        }
        const validationResponse = this.validatorDetails.validate(rawObject);

        // Transforma los datos crudos en una entidad pura de dominio
        const studentDetails = new StudentLevelDetailsEntity(
            validationResponse.id,
            validationResponse.status,
            validationResponse.purchaseDate,
            StudentLevelRelationMapper.moduleRelationFromObject(validationResponse.module),
            StudentLevelRelationMapper.sellerRelationFromObject(validationResponse.seller),
            StudentLevelRelationMapper.studentRelationFromObject(validationResponse.student),
        );

        return studentDetails;
    }

    toArrayEntities(rawObjects: BackendResponseProps[]): StudentLevelDetailsEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Student level data is missing");
        }

        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map((item) => this.toEntity(item));
    }
}
