import type { CertificateType, StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import { CustomError } from "@salc/core/enums";
import { Validators } from "@salc/core/utils";

export interface UpdateStudentDto {
    identificationCard?: string;
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    startDate?: string; // Changed to string
    dateOfBirth?: string; // Changed to string
    nationality?: string;
    certificateType?: CertificateType;
    contractStatus?: StudentContractStatus;
    isGraduated?: boolean;
}

export class UpdateStudentDtoImpl implements UpdateStudentDto {
    private constructor(
        public readonly identificationCard?: string,
        public readonly fullName?: string,
        public readonly phoneNumber?: string,
        public readonly startDate?: string,
        public readonly dateOfBirth?: string,
        public readonly nationality?: string,
        public readonly certificateType?: CertificateType,
        public readonly contractStatus?: StudentContractStatus,
        public readonly isGraduated?: boolean
    ) { }

    static create(data: Record<string, any>): UpdateStudentDto {
        const { identificationCard, fullName, phoneNumber, startDate, dateOfBirth, nationality,
            certificateType, contractStatus, isGraduated } = data;

        if (identificationCard && !Validators.isIdentificationCard(identificationCard)) throw CustomError.badRequest('Invalid identificationCard');
        if (fullName && fullName.length < 3) throw CustomError.badRequest('Invalid fullName');
        if (phoneNumber && !Validators.isPhoneNumber(phoneNumber)) throw CustomError.badRequest('Invalid phoneNumber');

        const dateRegularExpression = /^\d{4}-\d{2}-\d{2}$/;
        if (startDate && !dateRegularExpression.test(startDate)) throw CustomError.badRequest('Invalid startDate format. Expected YYYY-MM-DD');
        if (dateOfBirth && !dateRegularExpression.test(dateOfBirth)) throw CustomError.badRequest('Invalid dateOfBirth format. Expected YYYY-MM-DD');

        if (nationality && nationality.length < 3) throw CustomError.badRequest('Invalid nationality');
        if (certificateType && !Validators.isCertificateType(certificateType)) throw CustomError.badRequest('Invalid certificateType');
        if (contractStatus && !Validators.isStudentContractStatus(contractStatus)) throw CustomError.badRequest('Invalid contractStatus');
        if (isGraduated && !Validators.isBoolean(isGraduated)) throw CustomError.badRequest('Invalid isGraduated');

        return new UpdateStudentDtoImpl(
            identificationCard,
            fullName,
            phoneNumber,
            startDate,
            dateOfBirth,
            nationality,
            certificateType,
            contractStatus,
            isGraduated,
        );
    }
}