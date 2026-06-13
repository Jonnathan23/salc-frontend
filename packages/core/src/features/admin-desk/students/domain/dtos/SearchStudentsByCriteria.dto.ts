import { CustomError } from "@salc/core/enums";
import type {
    CertificateType,
    StudentContractStatus,
    StudentProgressCategory,
} from "@salc/core/features/admin-desk/students/domain/interfaces";

export interface SearchStudentsByCriteriaDtoProps {
    page: number;
    searchTerm?: string;
    st_nationality?: string;
    st_certificate_type?: CertificateType;
    st_is_graduated?: boolean;
    st_contract_status?: StudentContractStatus;
    st_progress_category?: StudentProgressCategory;
}

export class SearchStudentsByCriteriaDto {
    private constructor(
        public readonly page: number,
        public readonly searchTerm?: string,
        public readonly st_nationality?: string,
        public readonly st_certificate_type?: CertificateType,
        public readonly st_is_graduated?: boolean,
        public readonly st_contract_status?: StudentContractStatus,
        public readonly st_progress_category?: StudentProgressCategory,
    ) {}

    static create(data: SearchStudentsByCriteriaDtoProps): SearchStudentsByCriteriaDto {
        if (!data.page || data.page < 1) {
            throw CustomError.badRequest("Page must be a positive number");
        }

        return new SearchStudentsByCriteriaDto(
            data.page,
            data.searchTerm,
            data.st_nationality,
            data.st_certificate_type,
            data.st_is_graduated,
            data.st_contract_status,
            data.st_progress_category,
        );
    }
}
