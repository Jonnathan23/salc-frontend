import { PaymentDataSource } from "@salc/core/features/admin-desk/payments/domain/datasources/Payment.datasource";
import { SuccessResponse } from "@salc/core/interfaces";

export class RevertQuotaPaymentUseCase {
    constructor(private readonly paymentRepository: PaymentDataSource) {}

    async execute(quotaId: string): Promise<SuccessResponse<null>> {
        return await this.paymentRepository.revertQuotaPayment(quotaId);
    }
}
