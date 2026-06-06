import { CustomError } from "@salc/core/enums";

export interface PayQuotaDto {
    quotaId: string;
    amountPaid: number;
    paymentMethod: string;
}

export class PayQuotaDtoImpl implements PayQuotaDto {
    private constructor(
        public readonly quotaId: string,
        public readonly amountPaid: number,
        public readonly paymentMethod: string,
    ) {}

    static create(data: Record<string, any>): PayQuotaDto {
        if (!data.quotaId) throw CustomError.badRequest("quotaId is required");
        if (data.amountPaid === undefined || data.amountPaid === null || isNaN(data.amountPaid))
            throw CustomError.badRequest("amountPaid must be a valid number");
        if (!data.paymentMethod) throw CustomError.badRequest("paymentMethod is required");

        return new PayQuotaDtoImpl(data.quotaId, Number(data.amountPaid), data.paymentMethod);
    }
}
