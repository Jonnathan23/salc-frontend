import type { PaymentDataSource } from "@salc/core/features/admin-desk/payments/domain/datasources/Payment.datasource";
import type { PaymentRepository } from "@salc/core/features/admin-desk/payments/domain/repositories/Payment.repository";
import type { CreatePaymentPlanDto } from "@salc/core/features/admin-desk/payments/domain/dtos";
import type { PayQuotaDto } from "@salc/core/features/admin-desk/payments/domain/dtos";
import type { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities";
import type { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities";
import type { SuccessResponse } from "@salc/core/interfaces";

export class PaymentRepositoryImpl implements PaymentRepository {
    /**
     * @param paymentDatasource
     */
    constructor(private readonly paymentDatasource: PaymentDataSource) {}

    createPaymentPlan(studentId: string, dto: CreatePaymentPlanDto): Promise<SuccessResponse<PaymentPlanEntity>> {
        return this.paymentDatasource.createPaymentPlan(studentId, dto);
    }

    getStudentPaymentPlans(studentId: string): Promise<SuccessResponse<PaymentPlanEntity[]>> {
        return this.paymentDatasource.getStudentPaymentPlans(studentId);
    }

    processQuotaPayment(quotaId: string, dto: PayQuotaDto): Promise<SuccessResponse<PaymentQuotaEntity>> {
        return this.paymentDatasource.processQuotaPayment(quotaId, dto);
    }

    revertQuotaPayment(quotaId: string): Promise<SuccessResponse<null>> {
        return this.paymentDatasource.revertQuotaPayment(quotaId);
    }
}
