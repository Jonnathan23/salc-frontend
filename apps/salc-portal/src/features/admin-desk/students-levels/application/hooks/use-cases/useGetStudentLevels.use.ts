import { getStudentContractsUseCase } from "@salc/core/features/admin-desk/students-level/di/StudentLevelModule";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStudentLevels = (studentId: string) => {
    return useQuery({
        queryKey: ["get-all-student-levels", studentId],
        queryFn: () => getStudentContractsUseCase.execute(studentId),
        enabled: !!studentId,
        retry: false,
    });
};
