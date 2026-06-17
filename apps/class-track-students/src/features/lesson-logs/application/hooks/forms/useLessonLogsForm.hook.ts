import { useState } from "react";
import { useCreateLessonLogs } from "../use-cases/useCreateLessonLogs.hook";
import type {
    BaseLessonItemFormValue,
    BaseLessonLogsFormValues,
} from "../../../presentation/interfaces/BaseLessonLogsFormValues.interface";

interface UseLessonLogsFormProps {
    attendanceSessionId: string;
    onSuccessCallback?: () => void;
}

export const useLessonLogsForm = ({ attendanceSessionId, onSuccessCallback }: UseLessonLogsFormProps) => {
    const [lessons, setLessons] = useState<BaseLessonItemFormValue[]>([]);

    const { mutate: createLessonLogsMutation, isPending: isSubmitting } = useCreateLessonLogs({ onSuccessCallback });

    const addLesson = (lessonNumber: string = "") => {
        if (lessons.length >= 3) {
            return; // Límite de 3 lecciones por envío
        }
        const newLesson: BaseLessonItemFormValue = {
            id: crypto.randomUUID(),
            lessonNumber,
            oralPracticeScore: null,
            isCompleted: false,
        };

        setLessons([...lessons, newLesson]);
    };

    const updateLesson = (id: string, updates: Partial<BaseLessonItemFormValue>) => {
        setLessons((prev) => prev.map((lesson) => (lesson.id === id ? { ...lesson, ...updates } : lesson)));
    };

    const removeLesson = (id: string) => {
        setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    };

    const onSubmit = () => {
        const formData: BaseLessonLogsFormValues = {
            attendanceSessionId,
            lessonsStudied: lessons,
        };

        createLessonLogsMutation(formData);
    };

    return {
        lessons,
        setLessons,
        addLesson,
        updateLesson,
        removeLesson,
        onSubmit,
        isSubmitting,
    };
};
