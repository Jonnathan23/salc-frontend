import { searchStudentsUseCase } from "@salc/core/features/admin-desk/students/di/StudentModule";
import { useQuery } from "@tanstack/react-query";

export const useSearchStudent = (query: string) => {
    return useQuery({
        queryKey: ["Searchstudent", query],
        queryFn: () => searchStudentsUseCase.execute(query),
        enabled: !!query,
    });
};
