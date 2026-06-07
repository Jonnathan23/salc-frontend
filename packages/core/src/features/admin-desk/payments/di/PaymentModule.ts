import { GetStudentPaymentPlansUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/getStudentPaymentPlans.use-case";
import { ProcessQuotaPaymentUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/processQuotaPayment.use-case";
import { RevertQuotaPaymentUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/revertQuotaPayment.use-case";
import {
    paymentPlanSchema,
    paymentQuotaSchema,
} from "@salc/core/features/admin-desk/payments/infrastructure/schemas/Payment.schema";
import { CreatePaymentPlanUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/createPaymentPlan.use-case";
import { PaymentRepositoryImpl } from "@salc/core/features/admin-desk/payments/infrastructure/repositories/payment.repository";
import { PaymentMapperImpl } from "@salc/core/features/admin-desk/payments/infrastructure/mappers/payment.mapper";
import type { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";
import type { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Validators
const paymentValidator = validatorFactory.createValidator<PaymentPlanEntity>(paymentPlanSchema);
const paymentArrayValidator = validatorFactory.createValidator<PaymentPlanEntity[]>(paymentPlanSchema);
const paymentQuotaValidator = validatorFactory.createValidator<PaymentQuotaEntity>(paymentQuotaSchema);

//* Mapper
const paymentMapper = new PaymentMapperImpl(paymentValidator, paymentArrayValidator, paymentQuotaValidator);

//* Repositories
const paymentRepository = new PaymentRepositoryImpl(api, paymentMapper);

//* Use cases
export const createPaymentPlan = new CreatePaymentPlanUseCase(paymentRepository);

export const getStudentPaymentPlans = new GetStudentPaymentPlansUseCase(paymentRepository);

export const processQuotaPayment = new ProcessQuotaPaymentUseCase(paymentRepository);

export const revertQuotaPayment = new RevertQuotaPaymentUseCase(paymentRepository);
