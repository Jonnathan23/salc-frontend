export class LessonLogEntity {
    constructor(
        public readonly id: string,
        public readonly attendanceSessionId: string,
        public readonly lessonNumber: string,
        public readonly oralPracticeScore: number | null,
        public readonly isCompleted: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}
