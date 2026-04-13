import { CustomError } from "@salc/core/enums";
import { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { PaymentQuotaEntity, PaymentQuotaEntityImpl } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";
import { EntityValidator } from "@salc/core/interfaces/EntityValidator";

export interface PaymentMapper {
    toPlanEntity(rawObject: any): PaymentPlanEntity;
    toArrayPlanEntities(rawObjects: any[]): PaymentPlanEntity[];
    toQuotaEntity(rawObject: any): PaymentQuotaEntity;
}

export class PaymentMapperImpl implements PaymentMapper {

    /**
     * 
     * @param validator - Payment plan entity validator
     * @param arrayValidator - Payment plan array entity validator
     * @param quotaValidator - Payment quota entity validator
     */
    constructor(
        private readonly validator: EntityValidator<PaymentPlanEntity>,
        private readonly arrayValidator: EntityValidator<PaymentPlanEntity[]>,
        private readonly quotaValidator: EntityValidator<PaymentQuotaEntity>
    ) { }

    toPlanEntity(rawObject: any): PaymentPlanEntity {
        if (!rawObject) throw CustomError.notFound("Payment plan data is missing");

        const value = this.validator.validate(rawObject);

        return new PaymentPlanEntity(
            value.id, value.studentId, value.sellerId, value.enrollmentFee, value.totalAmount, value.isSinglePayment, value.status,
            value.quotas ? value.quotas.map((q: any) => this.toQuotaEntity(q)) : undefined,
            value.createdAt ? new Date(value.createdAt) : undefined,
            value.updatedAt ? new Date(value.updatedAt) : undefined
        );
    }

    toArrayPlanEntities(rawObjects: any[]): PaymentPlanEntity[] {
        if (!rawObjects) throw CustomError.notFound("Payment plans data is missing");

        const value = this.arrayValidator.validate(rawObjects);

        return value.map((plan) => this.toPlanEntity(plan));
    }

    toQuotaEntity(rawObject: any): PaymentQuotaEntity {
        if (!rawObject) throw CustomError.notFound("Payment quota data is missing");

        const value = this.quotaValidator.validate(rawObject);
        const { id, paymentPlanId, quotaNumber, paymentMethod, baseAmount, rolloverDebt, totalExpected, amountPaid, dueDate, status, createdAt, updatedAt } = value;

        return new PaymentQuotaEntityImpl(
            id,
            paymentPlanId,
            Number(quotaNumber),
            paymentMethod ?? null,
            Number(baseAmount),
            Number(rolloverDebt),
            Number(totalExpected),
            Number(amountPaid),
            new Date(dueDate),
            status,
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
        
    }
}
