import { CustomError } from "@salc/core/enums";

export interface UpdateModuleDto {
    mo_name?: string;
    mo_description?: string;
}

export class UpdateModuleDtoImpl implements UpdateModuleDto {

    private constructor(
        public readonly mo_name?: string,
        public readonly mo_description?: string
    ) { }

    static create(module: UpdateModuleDto): UpdateModuleDto {

        const { mo_name, mo_description } = module;

        if (!mo_name && !mo_description) throw CustomError.badRequest('Missing name and description');

        return new UpdateModuleDtoImpl(mo_name, mo_description);
    }
}