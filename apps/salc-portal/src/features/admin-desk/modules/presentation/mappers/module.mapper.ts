import { CreateModuleDtoImpl, UpdateModuleDtoImpl } from "@salc/core/features/admin-desk/modules/domain/dtos";
import type { BaseModuleFormValues } from "@/features/admin-desk/modules/presentation/interfaces/BaseFormValues.interface";

export const ModulePresentationMapper = {
    toCreateDto(formValues: BaseModuleFormValues) {
        const { name, description, level } = formValues;

        return CreateModuleDtoImpl.create({
            mo_name: name,
            mo_description: description,
            mo_level: level,
        });
    },

    toUpdateDto(formValues: BaseModuleFormValues) {
        const { name, description, level } = formValues;

        return UpdateModuleDtoImpl.create({
            mo_name: name,
            mo_description: description,
            mo_level: level,
        });
    },
};
