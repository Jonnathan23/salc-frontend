import { CustomError } from "@salc/core/enums";

export interface GetLastLessonLogDto {
    studentId: string;
}

export class GetLastLessonLogDtoImpl implements GetLastLessonLogDto {
    private constructor(public readonly studentId: string) {}

    static create(data: GetLastLessonLogDto): GetLastLessonLogDto {
        if (!data.studentId) {
            throw CustomError.badRequest("Missing student ID");
        }

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(data.studentId)) {
            throw CustomError.badRequest("studentId must be a valid UUID");
        }

        return new GetLastLessonLogDtoImpl(data.studentId);
    }
}
