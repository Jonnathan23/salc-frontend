import type { StudentLevelRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/studentLevel.repository";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { PurchaseModulesDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/PurchasesStudentLevel.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export interface PurchaseModulesUseCase {
    execute(dto: PurchaseModulesDto): Promise<SuccessResponse<StudentLevelEntity[]>>;
}

export class PurchaseModulesUseCaseImpl implements PurchaseModulesUseCase {
    constructor(private readonly studentLevelRepository: StudentLevelRepository) {}

    async execute(dto: PurchaseModulesDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        return this.studentLevelRepository.purchaseModules(dto);
    }
}
