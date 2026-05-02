import type { PaymentDataSource } from "@salc/core/features/admin-desk/payments/domain/datasources/Payment.datasource";
import type { PaymentPlanEntity, PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities";
import type { PaymentMapper } from "@salc/core/features/admin-desk/payments/infrastructure/mappers/Payment.mapper";
import type { CreatePaymentPlanDto, PayQuotaDto } from "@salc/core/features/admin-desk/payments/domain/dtos";
import type { SuccessResponse, MethodsHttp } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";


export class PaymentDataSourceImpl implements PaymentDataSource {
    private readonly baseUrl = "/payments";

    /**
     * @param apiPayments 
     * @param paymentMapper 
     */
    constructor(
        private readonly apiPayments: MethodsHttp,
        private readonly paymentMapper: PaymentMapper
    ) { }

    async createPaymentPlan(studentId: string, dto: CreatePaymentPlanDto): Promise<SuccessResponse<PaymentPlanEntity>> {
        const url = `${this.baseUrl}/student/${studentId}/plan`;
        const rawResponse = await this.apiPayments.post<SuccessResponse<PaymentPlanEntity>, CreatePaymentPlanDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not create payment plan");
        }

        return {
            ...rawResponse,
            data: this.paymentMapper.toPlanEntity(rawResponse.data)
        };
    }

    async getStudentPaymentPlans(studentId: string): Promise<SuccessResponse<PaymentPlanEntity[]>> {
        const url = `${this.baseUrl}/student/${studentId}`;
        const rawResponse = await this.apiPayments.get<SuccessResponse<PaymentPlanEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No payment plans found");
        }

        return {
            ...rawResponse,
            data: this.paymentMapper.toArrayPlanEntities(rawResponse.data)
        };
    }

    async processQuotaPayment(quotaId: string, dto: PayQuotaDto): Promise<SuccessResponse<PaymentQuotaEntity>> {
        const url = `${this.baseUrl}/quota/${quotaId}/pay`;
        const rawResponse = await this.apiPayments.patch<SuccessResponse<PaymentQuotaEntity>, PayQuotaDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not process quota payment");
        }

        return {
            ...rawResponse,
            data: this.paymentMapper.toQuotaEntity(rawResponse.data)
        };
    }

    async revertQuotaPayment(quotaId: string): Promise<SuccessResponse<null>> {
        const url = `${this.baseUrl}/quota/${quotaId}/revert`;
        const rawResponse = await this.apiPayments.post<SuccessResponse<null>, null>(url, null);

        return rawResponse;
    }
}
