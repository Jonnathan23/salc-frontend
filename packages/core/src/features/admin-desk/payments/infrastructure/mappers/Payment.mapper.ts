import { CustomError } from "@salc/core/enums";
import { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";
import { paymentPlanSchema, arrayPaymentPlansSchema, paymentQuotaSchema } from "@salc/core/features/admin-desk/payments/infrastructure/schemas/Payment.schema";
import { DataAccessLayerAdapter } from "@salc/core/adapters";

export const PaymentMapper = {
    toPlanEntity(rawObject: any): PaymentPlanEntity {
        if (!rawObject) throw CustomError.notFound("Payment plan data is missing");
        
        const value = DataAccessLayerAdapter.validateData(paymentPlanSchema, rawObject);
        
        return new PaymentPlanEntity(
            value.id, value.studentId, value.sellerId, value.enrollmentFee, value.totalAmount, value.isSinglePayment, value.status,
            value.quotas ? value.quotas.map((q: any) => this.toQuotaEntity(q)) : undefined,
            value.createdAt ? new Date(value.createdAt) : undefined,
            value.updatedAt ? new Date(value.updatedAt) : undefined
        );
    },

    toArrayPlanEntities(rawObjects: any[]): PaymentPlanEntity[] {
        if (!rawObjects) throw CustomError.notFound("Payment plans data is missing");
        
        const v = DataAccessLayerAdapter.validateData(arrayPaymentPlansSchema, rawObjects);
        
        return v.map((plan: any) => this.toPlanEntity(plan));
    },

    toQuotaEntity(rawObject: any): PaymentQuotaEntity {
        if (!rawObject) throw CustomError.notFound("Payment quota data is missing");
        
        const v = DataAccessLayerAdapter.validateData(paymentQuotaSchema, rawObject);
        
        return new PaymentQuotaEntity(
            v.id, v.paymentPlanId, v.quotaNumber, v.paymentMethod ?? null, v.baseAmount, v.rolloverDebt,
            v.totalExpected, v.amountPaid, new Date(v.dueDate), v.status,
            v.createdAt ? new Date(v.createdAt) : undefined,
            v.updatedAt ? new Date(v.updatedAt) : undefined
        );
    }
}
