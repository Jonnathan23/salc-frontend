import { format } from "date-fns";
import type { BaseStudentFormValues } from "@/features/admin-desk/students/presentation/interfaces";
import { RegisterStudentDtoImpl, UpdateStudentDtoImpl, type RegisterStudentDto, type UpdateStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { CertificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";

export class StudentFormMapper {
    public static toRegisterDto(formValues: BaseStudentFormValues): RegisterStudentDto {
        const formattedDateOfBirth = format(formValues.dateOfBirth, 'yyyy-MM-dd');
        const formattedStartDate = format(formValues.startDate, 'yyyy-MM-dd');

        return RegisterStudentDtoImpl.create({
            identificationCard: formValues.identificationCard.trim(),
            fullName: formValues.fullName.trim(),
            phoneNumber: formValues.phoneNumber.trim(),
            email: formValues.email.trim().toLowerCase(),
            dateOfBirth: formattedDateOfBirth,
            nationality: formValues.nationality,
            certificateType: formValues.certificateType,
            startDate: formattedStartDate
        });
    }

    public static toUpdateDto(formValues: BaseStudentFormValues): UpdateStudentDto {
        const formattedDateOfBirth = format(formValues.dateOfBirth, 'yyyy-MM-dd');
        const formattedStartDate = format(formValues.startDate, 'yyyy-MM-dd');

        return UpdateStudentDtoImpl.create({
            identificationCard: formValues.identificationCard.trim(),
            fullName: formValues.fullName.trim(),
            phoneNumber: formValues.phoneNumber.trim(),
            email: formValues.email.trim().toLowerCase(),
            dateOfBirth: formattedDateOfBirth,
            nationality: formValues.nationality,
            certificateType: formValues.certificateType,
            startDate: formattedStartDate
        });
    }

    public static toBaseFormValues(studentEntity: StudentEntity): BaseStudentFormValues {

        return {
            identificationCard: studentEntity.identificationCard,
            fullName: studentEntity.fullName,
            phoneNumber: studentEntity.phoneNumber,
            email: studentEntity.email,
            dateOfBirth: studentEntity.dateOfBirth,
            nationality: studentEntity.nationality,
            certificateType: studentEntity.certificateType as CertificateType,
            startDate: studentEntity.startDate
        };
    }
}