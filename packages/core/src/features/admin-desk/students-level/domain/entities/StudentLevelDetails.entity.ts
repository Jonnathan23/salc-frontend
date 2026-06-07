import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { UserEntity } from "@salc/core/features/shared/identity/domain/entities";

interface ModuleEntityRelation extends Pick<ModuleEntity, "moduleId" | "name" | "level"> {}

interface SellerEntityRelation extends Pick<UserEntity, "userId" | "fullName" | "email"> {}

interface StudentEntityRelation extends Pick<
    StudentEntity,
    "id" | "identificationCard" | "fullName" | "email" | "isGraduated" | "contractStatus"
> {}

export class StudentLevelDetailsEntity {
    constructor(
        public readonly id: string,
        public readonly status: StudentModuleStatus,
        public readonly purchaseDate: Date,
        public readonly module: ModuleEntityRelation,
        public readonly seller: SellerEntityRelation,
        public readonly student: StudentEntityRelation,
    ) {}
}
