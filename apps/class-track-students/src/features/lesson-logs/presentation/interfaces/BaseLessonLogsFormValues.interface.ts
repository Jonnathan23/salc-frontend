export interface BaseLessonItemFormValue {
    id: string; // ID temporal en la UI para el mapeo
    lessonNumber: string;
    oralPracticeScore: string | null;
    isCompleted: boolean;
}

export interface BaseLessonLogsFormValues {
    attendanceSessionId: string;
    lessonsStudied: BaseLessonItemFormValue[];
}
