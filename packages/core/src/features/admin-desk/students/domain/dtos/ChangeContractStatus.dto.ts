import { CustomError } from "@salc/core/enums";
import type { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";

export interface ChangeContractStatusDto {
    contractStatus: StudentContractStatus;
}

export class ChangeContractStatusDtoImpl implements ChangeContractStatusDto {
    private constructor(public readonly contractStatus: StudentContractStatus) {}

    static create(data: ChangeContractStatusDto): ChangeContractStatusDto {
        const { contractStatus } = data;

        if (!contractStatus) {
            throw CustomError.badRequest("Contract status is required");
        }

        return new ChangeContractStatusDtoImpl(contractStatus);
    }
}
