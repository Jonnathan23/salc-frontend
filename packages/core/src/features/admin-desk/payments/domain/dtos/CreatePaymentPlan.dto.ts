import { CustomError } from "@salc/core/enums";

export interface CreatePaymentPlanDto {
    studentId: string;
    sellerId: string;
    enrollmentFee: number;
    totalAmount: number;
    isSinglePayment: boolean;
    numberOfQuotas: number;
    firstQuotaDueDate: Date;
}

export class CreatePaymentPlanDtoImpl implements CreatePaymentPlanDto {
    private constructor(
        public readonly studentId: string,
        public readonly sellerId: string,
        public readonly enrollmentFee: number,
        public readonly totalAmount: number,
        public readonly isSinglePayment: boolean,
        public readonly numberOfQuotas: number,
        public readonly firstQuotaDueDate: Date
    ) {}

    static create(data: Record<string, any>): CreatePaymentPlanDto {
        if (!data.studentId) throw CustomError.badRequest("studentId is required");
        if (!data.sellerId) throw CustomError.badRequest("sellerId is required");
        if (data.enrollmentFee === undefined || data.enrollmentFee === null || isNaN(data.enrollmentFee)) throw CustomError.badRequest("enrollmentFee must be a valid number");
        if (data.totalAmount === undefined || data.totalAmount === null || isNaN(data.totalAmount)) throw CustomError.badRequest("totalAmount must be a valid number");
        if (data.isSinglePayment === undefined) throw CustomError.badRequest("isSinglePayment is required");
        if (data.numberOfQuotas === undefined || data.numberOfQuotas === null || isNaN(data.numberOfQuotas)) throw CustomError.badRequest("numberOfQuotas must be a valid number");
        if (!data.firstQuotaDueDate) throw CustomError.badRequest("firstQuotaDueDate is required");

        return new CreatePaymentPlanDtoImpl(
            data.studentId,
            data.sellerId,
            Number(data.enrollmentFee),
            Number(data.totalAmount),
            Boolean(data.isSinglePayment),
            Number(data.numberOfQuotas),
            new Date(data.firstQuotaDueDate)
        );
    }
}
