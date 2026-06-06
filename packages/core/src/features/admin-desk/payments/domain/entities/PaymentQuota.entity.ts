export interface PaymentQuotaEntity {
    id: string;
    paymentPlanId: string;
    quotaNumber: number;
    paymentMethod: string | null;
    baseAmount: number;
    rolloverDebt: number;
    totalExpected: number;
    amountPaid: number;
    dueDate: Date;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class PaymentQuotaEntityImpl implements PaymentQuotaEntity {
    constructor(
        public readonly id: string,
        public readonly paymentPlanId: string,
        public readonly quotaNumber: number,
        public readonly paymentMethod: string | null,
        public readonly baseAmount: number,
        public readonly rolloverDebt: number,
        public readonly totalExpected: number,
        public readonly amountPaid: number,
        public readonly dueDate: Date,
        public readonly status: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}
}
