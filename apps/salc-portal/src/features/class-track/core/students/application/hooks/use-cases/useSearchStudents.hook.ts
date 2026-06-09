import { useQuery } from "@tanstack/react-query";
import { searchStudentsUseCase } from "@salc/core/features/class-track-teachers/students/di/StudentClassTrackModule";
import type { BaseSearchStudentsFormValues } from "@/features/class-track/core/students/presentation/interfaces/BaseSearchStudentsFormValues.interface";

import { CustomError } from "@salc/core/enums";
import { SearchStudentsFormMapper } from "@/features/class-track/core/students/presentation/mappers/searchStudentsForm.mapper";

export const useSearchStudents = (formData: BaseSearchStudentsFormValues | null) => {
    return useQuery({
        queryKey: ["students", "search"],
        queryFn: async () => {
            if (!formData) {
                throw CustomError.notFound("No se enconW´+TRFtro el estudiante");
            }

            const validDataTransferObject = SearchStudentsFormMapper.toSearchDto(formData);

            const response = await searchStudentsUseCase.execute(validDataTransferObject);
            const students = response.data ?? [];

            return students;
        },
        enabled: formData !== null && formData.searchTerm.length >= 2,
    });
};
