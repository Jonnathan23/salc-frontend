import type { SuccessResponse } from "@salc/core/interfaces";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { PurchaseModulesDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/PurchasesStudentLevel.dto";
import type { UpdateStudentModuleDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/UpdateStuden.dto";

export abstract class StudentLevelRepository {
    abstract purchaseModules(dto: PurchaseModulesDto): Promise<SuccessResponse<StudentLevelEntity[]>>;
    abstract getStudentContracts(studentId: string): Promise<SuccessResponse<StudentLevelEntity[]>>;
    abstract updateStudentLevel(dto: UpdateStudentModuleDto): Promise<SuccessResponse<StudentLevelEntity[]>>;
    abstract deleteStudentLevel(studentLevelId: string): Promise<SuccessResponse<void>>;
}
