import { CustomError } from "@salc/core/enums";
import { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import { Validators } from "@salc/core/utils";


export interface UpdateStudentDto {
    identificationCard?: string;
    fullName?: string;
    phoneNumber?: string;
    startDate?: Date;
    contractStatus?: StudentContractStatus;
    isGraduated?: boolean;
}

export class UpdateStudentDtoImpl implements UpdateStudentDto {
    private constructor(
        public readonly identificationCard?: string,
        public readonly fullName?: string,
        public readonly phoneNumber?: string,
        public readonly startDate?: Date,
        public readonly contractStatus?: StudentContractStatus,
        public readonly isGraduated?: boolean
    ) {}

    static create(data: Record<string, any>): UpdateStudentDto {
        const { identificationCard, fullName, phoneNumber, startDate, contractStatus, isGraduated } = data;

        if (identificationCard && !Validators.isIdentificationCard(identificationCard)) throw CustomError.badRequest('Invalid identificationCard');
        if (fullName && fullName.length < 3) throw CustomError.badRequest('Invalid fullName');
        if (phoneNumber && !Validators.isPhoneNumber(phoneNumber)) throw CustomError.badRequest('Invalid phoneNumber');
        if (startDate && !Validators.isDate(startDate)) throw CustomError.badRequest('Invalid startDate');
        if (contractStatus && !Validators.isStudentContractStatus(contractStatus)) throw CustomError.badRequest('Invalid contractStatus');
        if (isGraduated && !Validators.isBoolean(isGraduated)) throw CustomError.badRequest('Invalid isGraduated');

        return new UpdateStudentDtoImpl(
            data.identificationCard,
            data.fullName,
            data.phoneNumber,
            data.startDate ? new Date(data.startDate) : undefined,
            data.contractStatus as StudentContractStatus,
            data.isGraduated
        );
    }
}
