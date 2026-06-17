import {
    CreateLessonLogsDtoImpl,
    type CreateLessonLogsDto,
    type LessonItemDto,
} from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/CreateLessonLogs.dto";
import type { BaseLessonLogsFormValues } from "../interfaces/BaseLessonLogsFormValues.interface";

export class LessonLogsFormMapper {
    public static toCreateDto(formValues: BaseLessonLogsFormValues): CreateLessonLogsDto {
        const mappedLessons: LessonItemDto[] = formValues.lessonsStudied.map((lesson) => {
            const parsedScore = lesson.oralPracticeScore ? Number(lesson.oralPracticeScore) : null;

            return {
                lessonNumber: Number(lesson.lessonNumber),
                oralPracticeScore: Number.isNaN(parsedScore) ? null : parsedScore,
                isCompleted: lesson.isCompleted,
            };
        });

        return CreateLessonLogsDtoImpl.create({
            attendanceSessionId: formValues.attendanceSessionId,
            lessonsStudied: mappedLessons,
        });
    }
}
