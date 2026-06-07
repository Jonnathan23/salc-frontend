import { CustomError } from "@salc/core/enums";

export interface UpdateModuleDto {
    mo_name?: string;
    mo_description?: string;
    mo_level?: number;
}

export class UpdateModuleDtoImpl implements UpdateModuleDto {
    private constructor(
        public readonly mo_name?: string,
        public readonly mo_description?: string,
        public readonly mo_level?: number,
    ) {}

    static create(module: UpdateModuleDto): UpdateModuleDto {
        const { mo_name, mo_description, mo_level } = module;

        if (!mo_name && !mo_description && !mo_level) throw CustomError.badRequest("Missing fields");

        if (mo_level && mo_level < 1) throw CustomError.badRequest("Level must be greater than 0");
        if (mo_level && mo_level > 6) throw CustomError.badRequest("Level must be less than or equal to 6");

        return new UpdateModuleDtoImpl(mo_name, mo_description, mo_level);
    }
}
