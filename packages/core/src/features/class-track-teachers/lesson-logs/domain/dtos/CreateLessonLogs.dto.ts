import { CustomError } from "@salc/core/enums";

export interface LessonItemDto {
    lessonNumber: number;
    oralPracticeScore?: number | null;
    isCompleted: boolean;
}

export interface CreateLessonLogsDto {
    attendanceSessionId: string;
    lessonsStudied: LessonItemDto[];
}

export class CreateLessonLogsDtoImpl implements CreateLessonLogsDto {
    private constructor(
        public readonly attendanceSessionId: string,
        public readonly lessonsStudied: LessonItemDto[],
    ) {}

    static create(data: CreateLessonLogsDto): CreateLessonLogsDto {
        if (!data.attendanceSessionId) {
            throw CustomError.badRequest("Missing attendance session ID");
        }

        if (!data.lessonsStudied || data.lessonsStudied.length === 0) {
            throw CustomError.badRequest("At least one lesson must be provided");
        }

        if (data.lessonsStudied.length > 3) {
            throw CustomError.badRequest("A maximum of 3 lessons can be reported at once");
        }

        const validLessons = data.lessonsStudied.map((lesson) => {
            if (typeof lesson.lessonNumber !== "number") {
                throw CustomError.badRequest("Lesson number must be a valid number");
            }
            if (typeof lesson.isCompleted !== "boolean") {
                throw CustomError.badRequest("isCompleted must be a boolean");
            }

            return {
                lessonNumber: lesson.lessonNumber,
                oralPracticeScore: lesson.oralPracticeScore ?? null,
                isCompleted: lesson.isCompleted,
            };
        });

        return new CreateLessonLogsDtoImpl(data.attendanceSessionId, validLessons);
    }
}
