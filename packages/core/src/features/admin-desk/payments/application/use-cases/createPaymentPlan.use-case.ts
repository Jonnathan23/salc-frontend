import { PaymentDataSource } from "@salc/core/features/admin-desk/payments/domain/datasources/Payment.datasource";
import { CreatePaymentPlanDto } from "@salc/core/features/admin-desk/payments/domain/dtos/CreatePaymentPlan.dto";
import { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { SuccessResponse } from "@salc/core/interfaces";

export class CreatePaymentPlanUseCase {
    constructor(private readonly paymentRepository: PaymentDataSource) {}

    async execute(studentId: string, dto: CreatePaymentPlanDto): Promise<SuccessResponse<PaymentPlanEntity>> {
        return await this.paymentRepository.createPaymentPlan(studentId, dto);
    }
}
