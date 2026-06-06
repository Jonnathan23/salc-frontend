import type { CertificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";

export interface BaseStudentFormValues {
    identificationCard: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    nationality: string;
    certificateType: CertificateType;
    startDate: Date;
}
