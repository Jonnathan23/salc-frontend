import { CustomError } from "@salc/core/enums";
import { Validators } from "@salc/core/utils";

export interface RegisterStudentDto {
    identificationCard: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    nationality: string;
    certificateType: string;
    startDate: Date;
}


export class RegisterStudentDtoImpl implements RegisterStudentDto {
    private constructor(
        public readonly identificationCard: string,
        public readonly fullName: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly dateOfBirth: Date,
        public readonly nationality: string,
        public readonly certificateType: string,
        public readonly startDate: Date
    ) { }

    static create(object: RegisterStudentDto): RegisterStudentDto {
        const { identificationCard, fullName, phoneNumber, email, dateOfBirth, nationality, certificateType, startDate } = object;

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

        const parsedBirthDate = new Date(dateOfBirth);
        if (isNaN(parsedBirthDate.getTime())) throw CustomError.badRequest('Invalid dateOfBirth');

        const parsedStartDate = new Date(startDate);
        if (isNaN(parsedStartDate.getTime())) throw CustomError.badRequest('Invalid startDate');

        return new RegisterStudentDtoImpl(
            identificationCard,
            fullName,
            phoneNumber,
            email,
            parsedBirthDate,
            nationality,
            certificateType,
            parsedStartDate
        );
    }
}
