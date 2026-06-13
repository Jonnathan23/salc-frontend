import { useQuery } from "@tanstack/react-query";
import { searchStudentsByCriteriaUseCase } from "@salc/core/features/admin-desk/students/di/StudentModule";
import type { BaseSearchStudentsCriteriaValues } from "@/features/admin-desk/students/presentation/interfaces/BaseSearchStudentsCriteriaValues.interface";
import { SearchStudentsCriteriaMapper } from "@/features/admin-desk/students/presentation/mappers/searchStudentsCriteria.mapper";

export const useSearchStudentsByCriteria = (filters: BaseSearchStudentsCriteriaValues) => {
    return useQuery({
        queryKey: ["students", "search-criteria", filters],
        queryFn: async () => {
            const dto = SearchStudentsCriteriaMapper.toDto(filters);

            return await searchStudentsByCriteriaUseCase.execute(dto);
        },
    });
};
