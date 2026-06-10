import { useQuery } from "@tanstack/react-query";
import { searchStudentsLevelsUseCase } from "@salc/core/features/admin-desk/students-level/di/InfoStudentsLevelsModule";
import type { SearchStudentsLevelsDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/SearchStudentsLevels.dto";
import { SearchStudentsLevelsDtoImpl } from "@salc/core/features/admin-desk/students-level/domain/dtos/SearchStudentsLevels.dto";
import { CustomError } from "@salc/core/enums";

export const useSearchStudentsLevels = (formData: SearchStudentsLevelsDto | null) => {
    return useQuery({
        queryKey: ["students-levels", "search", formData],
        queryFn: async () => {
            if (!formData) {
                throw CustomError.notFound("No se proporcionó el término de búsqueda");
            }

            const validDataTransferObject = SearchStudentsLevelsDtoImpl.create(formData);

            const response = await searchStudentsLevelsUseCase.execute(validDataTransferObject);
            const students = response.data ?? [];

            return students;
        },
        enabled: formData !== null && formData.searchTerm.length >= 2,
    });
};
