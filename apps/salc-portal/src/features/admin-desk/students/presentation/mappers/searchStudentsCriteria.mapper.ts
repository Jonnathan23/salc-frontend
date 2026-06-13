import { SearchStudentsByCriteriaDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import type { BaseSearchStudentsCriteriaValues } from "../interfaces/BaseSearchStudentsCriteriaValues.interface";

export class SearchStudentsCriteriaMapper {
    public static toDto(stateValues: BaseSearchStudentsCriteriaValues): SearchStudentsByCriteriaDto {
        return SearchStudentsByCriteriaDto.create({
            page: stateValues.page,
            searchTerm: stateValues.searchTerm || undefined,
            st_nationality: stateValues.nationality || undefined,
            st_certificate_type: stateValues.certificateType || undefined,
            st_is_graduated: stateValues.isGraduated ? Boolean(stateValues.isGraduated) : undefined,
            st_contract_status: stateValues.contractStatus || undefined,
            st_progress_category: stateValues.progressCategory || undefined,
        });
    }
}
