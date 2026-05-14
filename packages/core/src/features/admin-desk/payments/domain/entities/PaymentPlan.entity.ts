import type { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";

export interface PaymentPlanEntity {
    readonly id: string;
    readonly studentId: string;
    readonly sellerId: string;
    readonly enrollmentFee: number;
    readonly totalAmount: number;
    readonly isSinglePayment: boolean;
    readonly status: string;
    readonly quotas?: PaymentQuotaEntity[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class PaymentPlanEntityImpl implements PaymentPlanEntity {
    constructor(
        public readonly id: string,
        public readonly studentId: string,
        public readonly sellerId: string,
        public readonly enrollmentFee: number,
        public readonly totalAmount: number,
        public readonly isSinglePayment: boolean,
        public readonly status: string,
        public readonly quotas?: PaymentQuotaEntity[],
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}
}
