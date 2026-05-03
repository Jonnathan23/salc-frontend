import type { BaseStudentFormValues } from "@/features/students/presentation/interfaces";
import { RegisterStudentDtoImpl, type RegisterStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";

export class StudentFormMapper {
    public static toRegisterDto(formValues: BaseStudentFormValues): RegisterStudentDto {
        return RegisterStudentDtoImpl.create({
            identificationCard: formValues.identificationCard.trim(),
            fullName: formValues.fullName.trim(),
            phoneNumber: formValues.phoneNumber.trim(),
            email: formValues.email.trim().toLowerCase(),
            dateOfBirth: formValues.dateOfBirth,
            nationality: formValues.nationality,
            certificateType: formValues.certificateType,
            startDate: formValues.startDate
        });
    }
}