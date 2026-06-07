export interface ModuleEntity {
    moduleId: string;
    name: string;
    description: string;
    level: number;
    createdAt: string;
    updatedAt: string;
}

export class ModuleEntityImpl implements ModuleEntity {
    constructor(
        public moduleId: string,
        public name: string,
        public description: string,
        public level: number,
        public createdAt: string,
        public updatedAt: string,
    ) {}
}
