export interface ModuleEntity {
    mo_id: string;
    mo_name: string;
    mo_description: string;
    mo_level: number;
    mo_created_at: string;
    mo_updated_at: string;
}

export class ModuleEntityImpl implements ModuleEntity {
    constructor(
        public mo_id: string,
        public mo_name: string,
        public mo_description: string,
        public mo_level: number,
        public mo_created_at: string,
        public mo_updated_at: string,
    ) {}
}
