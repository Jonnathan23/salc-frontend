import { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";
import { CreatePaymentPlanDto } from "@salc/core/features/admin-desk/payments/domain/dtos/CreatePaymentPlan.dto";
import { PayQuotaDto } from "@salc/core/features/admin-desk/payments/domain/dtos/PayQuota.dto";
import { SuccessResponse } from "@salc/core/interfaces";

export abstract class PaymentDataSource {
    abstract createPaymentPlan(studentId: string, dto: CreatePaymentPlanDto): Promise<SuccessResponse<PaymentPlanEntity>>;
    abstract getStudentPaymentPlans(studentId: string): Promise<SuccessResponse<PaymentPlanEntity[]>>;
    abstract processQuotaPayment(quotaId: string, dto: PayQuotaDto): Promise<SuccessResponse<PaymentQuotaEntity>>;
    abstract revertQuotaPayment(quotaId: string): Promise<SuccessResponse<null>>;
}
