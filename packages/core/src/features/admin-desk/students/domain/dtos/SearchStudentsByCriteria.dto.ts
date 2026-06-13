import { CustomError } from "@salc/core/enums";
import type {
    CertificateType,
    StudentContractStatus,
    StudentProgressCategory,
} from "@salc/core/features/admin-desk/students/domain/interfaces";

export interface SearchStudentsByCriteriaDtoProps {
    page: number;
    st_identification_card?: string;
    st_full_name?: string;
    st_phone_number?: string;
    st_email?: string;
    st_nationality?: string;
    st_certificate_type?: CertificateType;
    st_start_date?: Date;
    st_is_graduated?: boolean;
    st_contract_status?: StudentContractStatus;
    st_progress_category?: StudentProgressCategory;
}

export class SearchStudentsByCriteriaDto {
    private constructor(
        public readonly page: number,
        public readonly st_identification_card?: string,
        public readonly st_full_name?: string,
        public readonly st_phone_number?: string,
        public readonly st_email?: string,
        public readonly st_nationality?: string,
        public readonly st_certificate_type?: CertificateType,
        public readonly st_start_date?: Date,
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
            data.st_identification_card,
            data.st_full_name,
            data.st_phone_number,
            data.st_email,
            data.st_nationality,
            data.st_certificate_type,
            data.st_start_date,
            data.st_is_graduated,
            data.st_contract_status,
            data.st_progress_category,
        );
    }
}
