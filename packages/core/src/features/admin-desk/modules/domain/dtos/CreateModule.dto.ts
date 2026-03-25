import { CustomError } from "@salc/core/enums";

export interface CreateModuleDto {
    mo_name: string;
    mo_description: string;
}

export class CreateModuleDtoImpl implements CreateModuleDto {

    private constructor(
        public readonly mo_name: string,
        public readonly mo_description: string
    ) { }

    static create(module: CreateModuleDto): CreateModuleDto {

        if (!module.mo_name) throw CustomError.badRequest('Missing name');
        if (!module.mo_description) throw CustomError.badRequest('Missing description');

        return new CreateModuleDtoImpl(module.mo_name, module.mo_description);

    }
}