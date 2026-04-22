import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentity/domain/entities";


export class UserLoginEntity {

    public constructor(
        public readonly user: UserAuthResponseEntity,
        public readonly token: string
    ) { }
}