import { CustomError } from "@salc/core/enums";
import { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";


export interface ChangeContractStatusDto {
    contractStatus: StudentContractStatus;
}

export class ChangeContractStatusDtoImpl implements ChangeContractStatusDto {
    private constructor(
        public readonly contractStatus: StudentContractStatus
    ) {}

    static create(data: Record<string, any>): ChangeContractStatusDto {
        if (!data.contractStatus) {
            throw CustomError.badRequest("Contract status is required");
        }

        return new ChangeContractStatusDtoImpl(data.contractStatus as StudentContractStatus);
    }
}
