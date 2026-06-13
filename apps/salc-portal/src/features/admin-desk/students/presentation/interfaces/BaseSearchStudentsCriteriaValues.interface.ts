import type {
    CertificateType,
    StudentContractStatus,
    StudentProgressCategory,
} from "@salc/core/features/admin-desk/students/domain/interfaces";

export interface BaseSearchStudentsCriteriaValues {
    page: number;
    searchTerm?: string;
    nationality?: string;
    certificateType?: CertificateType | "";
    isGraduated?: boolean | "";
    contractStatus?: StudentContractStatus | "";
    progressCategory?: StudentProgressCategory | "";
}
