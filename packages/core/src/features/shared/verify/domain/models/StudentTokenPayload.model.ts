export const clientRoles = {
    STUDENT: "STUDENT",
} as const;

export type ClientRoles = (typeof clientRoles)[keyof typeof clientRoles];

export class StudentTokenPayloadEntity {
    constructor(
        public readonly id: string,
        public readonly sessionId: string,
        public readonly role: ClientRoles,
    ) {}
}
