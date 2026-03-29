import { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";

export class PaymentPlanEntity {
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
