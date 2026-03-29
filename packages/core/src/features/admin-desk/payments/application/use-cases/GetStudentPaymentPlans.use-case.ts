import { PaymentDataSource } from "@salc/core/features/admin-desk/payments/domain/datasources/Payment.datasource";
import { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { SuccessResponse } from "@salc/core/interfaces";

export class GetStudentPaymentPlansUseCase {
    constructor(private readonly paymentRepository: PaymentDataSource) {}

    async execute(studentId: string): Promise<SuccessResponse<PaymentPlanEntity[]>> {
        return await this.paymentRepository.getStudentPaymentPlans(studentId);
    }
}
