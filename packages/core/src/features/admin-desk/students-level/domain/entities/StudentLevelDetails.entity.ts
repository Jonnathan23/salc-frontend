import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { UserEntity } from "@salc/core/features/shared/identity/domain/entities";

export const moduleRelationFields: readonly (keyof ModuleEntity)[] = ["moduleId", "name", "level"] as const;

export const sellerRelationFields: readonly (keyof UserEntity)[] = ["userId", "fullName", "email"] as const;

export const studentRelationFields: readonly (keyof StudentEntity)[] = [
    "id",
    "identificationCard",
    "fullName",
    "email",
    "isGraduated",
    "contractStatus",
] as const;

export type ModuleEntityRelation = Pick<ModuleEntity, (typeof moduleRelationFields)[number]>;
export type SellerEntityRelation = Pick<UserEntity, (typeof sellerRelationFields)[number]>;
export type StudentEntityRelation = Pick<StudentEntity, (typeof studentRelationFields)[number]>;

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
