import { CustomError } from "@salc/core/enums";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { ModuleEntityImpl } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

export interface ModuleMapper {
    toEntity(rawObject: ModuleMapperProps): ModuleEntity;
    toArrayEntities(rawObjects: ModuleMapperProps[]): ModuleEntity[];
}

type ModuleMapperProps = Record<string, unknown> | unknown | null | undefined;

export class ModuleMapperImpl implements ModuleMapper {
    /**
     * @param validator - EntityValidator<ModuleEntity>
     * @param arrayValidator - EntityValidator<ModuleEntity[]>
     */
    constructor(
        private readonly validator: EntityValidator<ModuleEntity>,
        private readonly arrayValidator: EntityValidator<ModuleEntity[]>,
    ) {}

    toEntity(rawObject: ModuleMapperProps): ModuleEntity {
        if (!rawObject) {
            throw CustomError.notFound("Module data is missing");
        }

        const validationResponse = this.validator.validate(rawObject) as any;

        return new ModuleEntityImpl(
            validationResponse.mo_id,
            validationResponse.mo_name,
            validationResponse.mo_description,
            validationResponse.mo_level,
            validationResponse.mo_created_at,
            validationResponse.mo_updated_at,
        );
    }

    toArrayEntities(rawObjects: ModuleMapperProps[]): ModuleEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Modules data is missing");
        }

        const validationResponse = this.arrayValidator.validate(rawObjects);

        return validationResponse.map((module) => this.toEntity(module));
    }
}
