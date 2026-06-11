import type { BaseSearchStudentsFormValues } from "@/features/class-track/core/students/presentation/interfaces/BaseSearchStudentsFormValues.interface";
import {
    SearchStudentsDtoImpl,
    type SearchStudentsDto,
} from "@salc/core/features/class-track-teachers/students/domain/dtos/SearchStudents.dto";

export class SearchStudentsFormMapper {
    public static toSearchDto(formValues: BaseSearchStudentsFormValues): SearchStudentsDto {
        const searchTerm = formValues.searchTerm.trim();

        return SearchStudentsDtoImpl.create({ searchTerm });
    }
}
