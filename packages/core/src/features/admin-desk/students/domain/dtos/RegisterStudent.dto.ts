import { CustomError } from "@salc/core/enums";
import { type CertificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import { Validators } from "@salc/core/utils";

export interface RegisterStudentDto {
    identificationCard: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string; // Changed to string
    nationality: string;
    certificateType: CertificateType;
    startDate: string; // Changed to string
}

export class RegisterStudentDtoImpl implements RegisterStudentDto {
    private constructor(
        public readonly identificationCard: string,
        public readonly fullName: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly dateOfBirth: string,
        public readonly nationality: string,
        public readonly certificateType: CertificateType,
        public readonly startDate: string
    ) { }

    static create(data: RegisterStudentDto): RegisterStudentDto {
        const { identificationCard, fullName, phoneNumber, email, dateOfBirth, nationality, certificateType, startDate } = data;

        if (!identificationCard) throw CustomError.badRequest('Missing identificationCard');
        if (!fullName) throw CustomError.badRequest('Missing fullName');
        if (!phoneNumber) throw CustomError.badRequest('Missing phoneNumber');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!dateOfBirth) throw CustomError.badRequest('Missing dateOfBirth');
        if (!nationality) throw CustomError.badRequest('Missing nationality');
        if (!certificateType) throw CustomError.badRequest('Missing certificateType');
        if (!startDate) throw CustomError.badRequest('Missing startDate');

        if (!Validators.isIdentificationCard(identificationCard)) throw CustomError.badRequest('Invalid identificationCard');
        if (!Validators.isPhoneNumber(phoneNumber)) throw CustomError.badRequest('Invalid phoneNumber');
        if (fullName.length < 3) throw CustomError.badRequest('Invalid fullName');
        if (!Validators.isEmail(email)) throw CustomError.badRequest('Invalid email');

        const dateRegularExpression = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegularExpression.test(dateOfBirth)) throw CustomError.badRequest('Invalid dateOfBirth format. Expected YYYY-MM-DD');
        if (!dateRegularExpression.test(startDate)) throw CustomError.badRequest('Invalid startDate format. Expected YYYY-MM-DD');

        if (!Validators.isCertificateType(certificateType)) throw CustomError.badRequest('Invalid certificateType');

        return new RegisterStudentDtoImpl(
            identificationCard,
            fullName,
            phoneNumber,
            email,
            dateOfBirth,
            nationality,
            certificateType,
            startDate
        );
    }
}