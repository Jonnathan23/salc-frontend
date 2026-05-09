import { CustomError } from "@salc/core/enums";

import { StudentLevelEntity } from "../../domain/entities/StudentLevel.entity";
import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

export interface StudentLevelMapperProps {
    id: string;
    studentId: string;
    moduleId: string;
    sellerId: string;
    status: "ACTIVE" | "APPROVED" | "LOCKED";
    purchaseDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface StudentLevelMapper {
    toEntity(rawObject: StudentLevelMapperProps): StudentLevelEntity;
}

export class StudentLevelMapperImpl implements StudentLevelMapper {
    constructor(
        private readonly validator: EntityValidator<StudentLevelMapperProps>
    ) {}

    toEntity(rawObject: StudentLevelMapperProps): StudentLevelEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student level data is missing");
        }

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
}
