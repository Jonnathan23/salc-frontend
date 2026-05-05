import { CustomError } from "@salc/core/enums";

export interface CreateModuleDto {
    mo_name: string;
    mo_description: string;
    mo_level: number;
}

export class CreateModuleDtoImpl implements CreateModuleDto {

    private constructor(
        public readonly mo_name: string,
        public readonly mo_description: string,
        public readonly mo_level: number
    ) { }

    static create(module: CreateModuleDto): CreateModuleDto {

        const { mo_name, mo_description, mo_level } = module;

        if (!mo_name) throw CustomError.badRequest('Missing name');
        if (!mo_description) throw CustomError.badRequest('Missing description');
        if (!mo_level) throw CustomError.badRequest('Missing level');

        if(mo_level < 1) throw CustomError.badRequest('Level must be greater than 0');
        if(mo_level > 6) throw CustomError.badRequest('Level must be less than or equal to 6');

        return new CreateModuleDtoImpl(mo_name, mo_description, mo_level);

    }
}