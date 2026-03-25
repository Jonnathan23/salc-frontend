import { CustomError } from "@salc/core/enums";
import { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { arrayModulesSchema, moduleSchema } from "@salc/core/features/admin-desk/modules/infrastructure/schemas/module.schema";
import { SuccessResponse } from "@salc/core/interfaces";
import { DataAccessLayerAdapter } from "@salc/core/utils";

type ModuleMapperProps = Record<string, unknown> | unknown | null | undefined;

export const ModuleMapper = {
    toEntity(rawObject: ModuleMapperProps): ModuleEntity {
        if (!rawObject) {
            throw CustomError.notFound("Module data is missing");
        }

        const validationResponse = DataAccessLayerAdapter.validateData(moduleSchema, rawObject);

        return new ModuleEntity(
            validationResponse.mo_id,
            validationResponse.mo_name,
            validationResponse.mo_description,
            validationResponse.mo_created_at.toISOString(),
            validationResponse.mo_updated_at.toISOString()
        );
    },

    toArrayEntities(rawObjects: ModuleMapperProps[]): ModuleEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Modules data is missing");
        }

        const validationResponse = DataAccessLayerAdapter.validateData(arrayModulesSchema, rawObjects);

        return validationResponse.map((module) => this.toEntity(module));
    },

    validationNullInformation(rawResponse: SuccessResponse): SuccessResponse {
        const responseSchema = DataAccessLayerAdapter.buildSuccessResponseSchema();
        const validationResponse = DataAccessLayerAdapter.validateData(responseSchema, rawResponse);

        return validationResponse;
    }
}