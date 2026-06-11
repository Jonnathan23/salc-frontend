import { PaymentDataSource } from "@salc/core/features/admin-desk/payments/domain/datasources/Payment.datasource";
import { PayQuotaDto } from "@salc/core/features/admin-desk/payments/domain/dtos/PayQuota.dto";
import { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";
import { SuccessResponse } from "@salc/core/interfaces";

export class ProcessQuotaPaymentUseCase {
    constructor(private readonly paymentRepository: PaymentDataSource) {}

    async execute(quotaId: string, dto: PayQuotaDto): Promise<SuccessResponse<PaymentQuotaEntity>> {
        return await this.paymentRepository.processQuotaPayment(quotaId, dto);
    }
}
