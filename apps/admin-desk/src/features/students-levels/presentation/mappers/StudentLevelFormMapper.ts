import type { BaseStudentLevelFormValues } from "@/features/students-levels/presentation/interfaces/BaseStudentLevelFormValues.interface";
import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";
import type { PurchaseModulesDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/PurchasesStudentLevel.dto";
import { PurchaseModulesDtoImpl } from "@salc/core/features/admin-desk/students-level/domain/dtos/PurchasesStudentLevel.dto";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { UpdateStudentModuleDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/UpdateStuden.dto";
import { UpdateStudentModuleDtoImpl } from "@salc/core/features/admin-desk/students-level/domain/dtos/UpdateStuden.dto";

export class StudentLevelFormMapper {
    // Transforma los datos crudos del formulario al DTO de compra validado
    public static toPurchaseDto(formValues: BaseStudentLevelFormValues): PurchaseModulesDto {
        return PurchaseModulesDtoImpl.create({
            studentId: formValues.studentId.trim(),
            sellerId: formValues.sellerId.trim(),
            moduleIds: formValues.moduleIds,
        });
    }

    // Transforma los datos crudos del formulario al DTO de actualización validado
    public static toUpdateDto(formValues: BaseStudentLevelFormValues): UpdateStudentModuleDto {
        return UpdateStudentModuleDtoImpl.create({
            contractId: formValues.contractId.trim(),
            studentId: formValues.studentId.trim(),
            status: formValues.status as StudentModuleStatus,
        });
    }

    // Mapeo Inverso: Transforma la Entidad del dominio al estado de la vista para actualizar
    public static toBaseFormValues(studentLevelEntity: StudentLevelEntity): BaseStudentLevelFormValues {
        return {
            studentId: studentLevelEntity.studentId,
            sellerId: studentLevelEntity.sellerId,
            moduleIds: [studentLevelEntity.moduleId], // La entidad maneja un solo módulo
            contractId: studentLevelEntity.id,
            status: studentLevelEntity.status,
        };
    }
}
