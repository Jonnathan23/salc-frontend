import { UserAuthResponseEntity } from "@salc/core/features/shared/indentiy/domain/entities";


export class UserLoginEntity {

    public constructor(
        public readonly user: UserAuthResponseEntity,
        public readonly token: string
    ) {}
}