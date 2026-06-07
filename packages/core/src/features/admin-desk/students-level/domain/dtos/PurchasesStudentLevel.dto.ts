import { CustomError } from "@salc/core/enums";
import { Validators } from "@salc/core/utils";

export interface PurchaseModulesDto {
    studentId: string;
    sellerId: string;
    moduleIds: string[];
}

export class PurchaseModulesDtoImpl implements PurchaseModulesDto {
    private constructor(
        public readonly studentId: string,
        public readonly sellerId: string,
        public readonly moduleIds: string[],
    ) {}

    static create(data: PurchaseModulesDto): PurchaseModulesDto {
        const { studentId, sellerId, moduleIds } = data;

        if (!studentId) throw CustomError.badRequest("Missing student");
        if (!sellerId) throw CustomError.badRequest("Missing seller");
        if (!moduleIds || !Array.isArray(moduleIds) || moduleIds.length === 0)
            throw CustomError.badRequest("You have not selected any modules");

        if (!Validators.IsUUID(studentId)) throw CustomError.badRequest("Invalid student");
        if (!Validators.IsUUID(sellerId)) throw CustomError.badRequest("Invalid seller");

        const uniqueModuleIds = new Set(moduleIds);

        if (uniqueModuleIds.size !== moduleIds.length) throw CustomError.badRequest("You have selected duplicate modules");

        for (const currentModuleId of moduleIds) {
            if (!Validators.IsUUID(currentModuleId)) throw CustomError.badRequest("Invalid moduleId format");
        }

        return new PurchaseModulesDtoImpl(studentId, sellerId, moduleIds);
    }
}
