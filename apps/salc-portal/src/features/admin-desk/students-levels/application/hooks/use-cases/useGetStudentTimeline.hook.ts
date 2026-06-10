import { useQuery } from "@tanstack/react-query";
import { getStudentTimelineUseCase } from "@salc/core/features/admin-desk/students-level/di/InfoStudentsLevelsModule";
import { CustomError } from "@salc/core/enums";

export const useGetStudentTimeline = (studentId: string | null) => {
    return useQuery({
        queryKey: ["students-levels", "timeline", studentId],
        queryFn: async () => {
            if (!studentId) {
                throw CustomError.notFound("No se proporcionó el estudiante");
            }

            const response = await getStudentTimelineUseCase.execute(studentId);
            const timeline = response.data;

            if (!timeline) {
                throw CustomError.notFound("No se encontró el timeline del estudiante");
            }

            return timeline;
        },
        enabled: studentId !== null,
    });
};
