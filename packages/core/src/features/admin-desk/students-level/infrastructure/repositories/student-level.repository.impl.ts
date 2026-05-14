import type { StudentLevelRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/student-level.repository";
import type { StudentLevelDataSource } from "@salc/core/features/admin-desk/students-level/domain/datasource/student-level.datasource";
import type { PurchaseModulesDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/PurchasesStudentLevel.dto";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { UpdateStudentModuleDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/UpdateStuden.dto";
import type { SuccessResponse } from "@salc/core/interfaces";
import type { StudentLevelDetailsEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevelDetails.entity";

export class StudentLevelRepositoryImpl implements StudentLevelRepository {

    constructor(
        private readonly studentLevelDataSource: StudentLevelDataSource,
    ) { }

    purchaseModules(dto: PurchaseModulesDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        return this.studentLevelDataSource.purchaseModules(dto);
    }

    getStudentContracts(studentId: string): Promise<SuccessResponse<StudentLevelDetailsEntity[]>> {
        return this.studentLevelDataSource.getStudentContracts(studentId);
    }

    updateStudentLevel(dto: UpdateStudentModuleDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        return this.studentLevelDataSource.updateStudentLevel(dto);
    }

    deleteStudentLevel(studentLevelId: string): Promise<SuccessResponse<void>> {
        return this.studentLevelDataSource.deleteStudentLevel(studentLevelId);
    }
}
