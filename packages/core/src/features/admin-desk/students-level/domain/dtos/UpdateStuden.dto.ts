import { CustomError } from "@salc/core/enums";
import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";
import { Validators } from "@salc/core/utils";

export interface UpdateStudentModuleDto {
    contractId: string;
    studentId: string;
    status: StudentModuleStatus;
}


export class UpdateStudentModuleDtoImpl implements UpdateStudentModuleDto {
    private constructor(
        public readonly contractId: string,
        public readonly studentId: string,
        public readonly status: StudentModuleStatus
    ) { }

    static create(data: UpdateStudentModuleDto): UpdateStudentModuleDto {
        const { contractId, studentId, status } = data;

        if (!contractId) throw CustomError.badRequest('Missing contractId');
        if (!studentId) throw CustomError.badRequest('Missing studentId');
        if (!status) throw CustomError.badRequest('Missing status');

        if (!Validators.IsUUID(contractId)) throw CustomError.badRequest('Invalid contractId');
        if (!Validators.IsUUID(studentId)) throw CustomError.badRequest('Invalid studentId');
        if (!Validators.isStudentModuleStatus(status)) throw CustomError.badRequest('Invalid status');

        return new UpdateStudentModuleDtoImpl(contractId, studentId, status);
    }
}
