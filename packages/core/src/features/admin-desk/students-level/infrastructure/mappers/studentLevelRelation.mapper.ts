import { pickFields } from "@salc/core/utils";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { UserEntity } from "@salc/core/features/shared/identity/domain/entities";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import {
    moduleRelationFields,
    sellerRelationFields,
    studentRelationFields,
    type ModuleEntityRelation,
    type SellerEntityRelation,
    type StudentEntityRelation,
} from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevelDetails.entity";

export class StudentLevelRelationMapper {
    public static moduleRelationFromObject(module: { [key: string]: any }): ModuleEntityRelation {
        const moduleEntity = {
            moduleId: module.mo_id,
            name: module.mo_name,
            level: module.mo_level,
        } as ModuleEntity;

        return pickFields({ objectToFilter: moduleEntity, fieldsToKeep: moduleRelationFields });
    }

    public static sellerRelationFromObject(seller: { [key: string]: any }): SellerEntityRelation {
        const userEntity = {
            userId: seller.us_id,
            fullName: seller.us_full_name,
            email: seller.us_email,
        } as UserEntity;

        return pickFields({ objectToFilter: userEntity, fieldsToKeep: sellerRelationFields });
    }

    public static studentRelationFromObject(student: { [key: string]: any }): StudentEntityRelation {
        return pickFields({ objectToFilter: student as StudentEntity, fieldsToKeep: studentRelationFields });
    }
}
