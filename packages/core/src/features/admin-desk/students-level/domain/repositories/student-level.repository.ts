import type { StudentLevelDetailsEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevelDetails.entity";
import type { PurchaseModulesDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/PurchasesStudentLevel.dto";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { UpdateStudentModuleDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/UpdateStuden.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class StudentLevelRepository {
    abstract purchaseModules(dto: PurchaseModulesDto): Promise<SuccessResponse<StudentLevelEntity[]>>;
    abstract getStudentContracts(studentId: string): Promise<SuccessResponse<StudentLevelDetailsEntity[]>>;
    abstract updateStudentLevel(dto: UpdateStudentModuleDto): Promise<SuccessResponse<StudentLevelEntity[]>>;
    abstract deleteStudentLevel(studentLevelId: string): Promise<SuccessResponse<void>>;
}
