import { useQuery } from "@tanstack/react-query";
import { searchStudentsUseCase } from "@salc/core/features/class-track-teachers/students/di/StudentClassTrackModule";
import { SearchStudentsDtoImpl } from "@salc/core/features/class-track-teachers/students/domain/dtos/SearchStudents.dto";

export const useSearchStudents = (query: string) => {
    return useQuery({
        queryKey: ["students", query],
        queryFn: async () => {
            if (!query) return null;

            const dto = SearchStudentsDtoImpl.create({ searchTerm: query });

            return await searchStudentsUseCase.execute(dto);
        },
        enabled: query.length >= 3,
    });
};
