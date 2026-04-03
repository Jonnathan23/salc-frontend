import { CustomError } from "@salc/core/enums";
import { PaymentDataSource } from "@salc/core/features/admin-desk/payments/domain/datasources/Payment.datasource";
import { CreatePaymentPlanDto } from "@salc/core/features/admin-desk/payments/domain/dtos/CreatePaymentPlan.dto";
import { PayQuotaDto } from "@salc/core/features/admin-desk/payments/domain/dtos/PayQuota.dto";
import { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";
import { PaymentMapper } from "@salc/core/features/admin-desk/payments/infrastructure/mappers/Payment.mapper";
import { SuccessResponse } from "@salc/core/interfaces";
import { apiSalc } from "@salc/core/lib";

export class PaymentRepositoryImpl implements PaymentDataSource {
    private readonly baseUrl = "/payments";

    async createPaymentPlan(studentId: string, dto: CreatePaymentPlanDto): Promise<SuccessResponse<PaymentPlanEntity>> {
        const url = `${this.baseUrl}/student/${studentId}/plan`;
        const rawResponse = await apiSalc.post<SuccessResponse<PaymentPlanEntity>, CreatePaymentPlanDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not create payment plan");
        }

        return {
            ...rawResponse,
            data: PaymentMapper.toPlanEntity(rawResponse.data)
        };
    }

    async getStudentPaymentPlans(studentId: string): Promise<SuccessResponse<PaymentPlanEntity[]>> {
        const url = `${this.baseUrl}/student/${studentId}`;
        const rawResponse = await apiSalc.get<SuccessResponse<PaymentPlanEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No payment plans found");
        }

        return {
            ...rawResponse,
            data: PaymentMapper.toArrayPlanEntities(rawResponse.data)
        };
    }

    async processQuotaPayment(quotaId: string, dto: PayQuotaDto): Promise<SuccessResponse<PaymentQuotaEntity>> {
        const url = `${this.baseUrl}/quota/${quotaId}/pay`;
        const rawResponse = await apiSalc.patch<SuccessResponse<PaymentQuotaEntity>, PayQuotaDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not process quota payment");
        }

        return {
            ...rawResponse,
            data: PaymentMapper.toQuotaEntity(rawResponse.data)
        };
    }

    async revertQuotaPayment(quotaId: string): Promise<SuccessResponse<null>> {
        const url = `${this.baseUrl}/quota/${quotaId}/revert`;
        const rawResponse = await apiSalc.post<SuccessResponse<null>, null>(url, null);

        return rawResponse;
    }
}
