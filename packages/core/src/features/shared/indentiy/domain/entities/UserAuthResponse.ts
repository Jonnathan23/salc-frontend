

export class UserAuthResponseEntity {
    constructor(
        public us_id: string,
        public us_full_name: string,
        public us_email: string,
        public us_role: string,
        public us_is_active: string,
    ) { }
}