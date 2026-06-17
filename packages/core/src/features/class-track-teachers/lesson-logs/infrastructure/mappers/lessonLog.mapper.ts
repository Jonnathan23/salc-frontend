import { CustomError } from "@salc/core/enums";
import { LessonLogEntity } from "@salc/core/features/class-track-teachers/lesson-logs/domain/entities/LessonLog.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

type LessonLogMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface LessonLogMapper {
    toEntity(rawObject: LessonLogMapperProps): LessonLogEntity;
    toArrayEntities(rawObjects: LessonLogMapperProps[]): LessonLogEntity[];
}

export class LessonLogMapperImpl implements LessonLogMapper {
    constructor(
        private readonly validator: EntityValidator<LessonLogEntity>,
        private readonly arrayValidator: EntityValidator<LessonLogEntity[]>,
    ) {}

    toEntity(rawObject: LessonLogMapperProps): LessonLogEntity {
        if (!rawObject) {
            throw CustomError.notFound("Lesson log data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        return new LessonLogEntity(
            validationResponse.id,
            validationResponse.attendanceSessionId,
            validationResponse.lessonNumber,
            validationResponse.oralPracticeScore,
            validationResponse.isCompleted,
            new Date(validationResponse.createdAt),
            new Date(validationResponse.updatedAt),
        );
    }

    toArrayEntities(rawObjects: LessonLogMapperProps[]): LessonLogEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Lesson logs data is missing");
        }
        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map((log) => this.toEntity(log));
    }
}
