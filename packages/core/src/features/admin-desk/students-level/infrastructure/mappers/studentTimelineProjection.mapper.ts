import { CustomError } from "@salc/core/enums";
import { StudentTimelineProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import type { BackendResponseProps } from "@salc/core/types/BackendResponse.type";

export interface StudentTimelineInnerMapper {
    mapStudentInfo(rawStudentInfo: any): any;
    mapEnrolledLevel(rawEnrolledLevel: any): any;
    mapAvailableModule(rawModule: any): any;
}

export class StudentTimelineInnerMapperImpl implements StudentTimelineInnerMapper {
    mapStudentInfo(rawStudentInfo: any) {
        return {
            id: rawStudentInfo.id,
            fullName: rawStudentInfo.fullName,
            phoneNumber: rawStudentInfo.phoneNumber,
            startDate: new Date(rawStudentInfo.startDate),
        };
    }

    mapEnrolledLevel(rawEnrolledLevel: any) {
        return {
            contractId: rawEnrolledLevel.contractId,
            status: rawEnrolledLevel.status,
            purchaseDate: new Date(rawEnrolledLevel.purchaseDate),
            module: {
                moduleId: rawEnrolledLevel.module.moduleId,
                name: rawEnrolledLevel.module.name,
                level: rawEnrolledLevel.module.level,
            },
        };
    }

    mapAvailableModule(rawModule: any) {
        return {
            moduleId: rawModule.moduleId,
            name: rawModule.name,
            level: rawModule.level,
            description: rawModule.description,
        };
    }
}

export interface StudentTimelineProjectionMapper {
    toEntity(rawObject: BackendResponseProps): StudentTimelineProjectionEntity;
}

export class StudentTimelineProjectionMapperImpl implements StudentTimelineProjectionMapper {
    constructor(
        private readonly validator: EntityValidator<StudentTimelineProjectionEntity>,
        private readonly innerMapper: StudentTimelineInnerMapper,
    ) {}

    toEntity(rawObject: BackendResponseProps): StudentTimelineProjectionEntity {
        if (!rawObject) {
            throw CustomError.notFound("Timeline data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        return new StudentTimelineProjectionEntity(
            this.innerMapper.mapStudentInfo(validationResponse.studentInfo),
            validationResponse.enrolledLevels.map((level) => this.innerMapper.mapEnrolledLevel(level)),
            validationResponse.availableModules.map((module) => this.innerMapper.mapAvailableModule(module)),
        );
    }
}
