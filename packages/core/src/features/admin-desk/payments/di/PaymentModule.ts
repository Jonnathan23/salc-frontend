import { GetStudentPaymentPlansUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/GetStudentPaymentPlans.use-case";
import { ProcessQuotaPaymentUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/ProcessQuotaPayment.use-case";
import { RevertQuotaPaymentUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/RevertQuotaPayment.use-case";
import { paymentPlanSchema, paymentQuotaSchema } from "@salc/core/features/admin-desk/payments/infrastructure/schemas/Payment.schema";
import { CreatePaymentPlanUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/CreatePaymentPlan.use-case";
import { PaymentRepositoryImpl } from "@salc/core/features/admin-desk/payments/infrastructure/repositories/Payment.repository";
import { PaymentMapperImpl } from "@salc/core/features/admin-desk/payments/infrastructure/mappers/Payment.mapper";
import { PaymentQuotaEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentQuota.entity";
import { PaymentPlanEntity } from "@salc/core/features/admin-desk/payments/domain/entities/PaymentPlan.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Validators
const paymentValidator = validatorFactory.createValidator<PaymentPlanEntity>(paymentPlanSchema);
const paymentArrayValidator = validatorFactory.createValidator<PaymentPlanEntity[]>(paymentPlanSchema);
const paymentQuotaValidator = validatorFactory.createValidator<PaymentQuotaEntity>(paymentQuotaSchema);


//* Mapper
const paymentMapper = new PaymentMapperImpl(
    paymentValidator,
    paymentArrayValidator,
    paymentQuotaValidator
);

//* Repositories
const paymentRepository = new PaymentRepositoryImpl(api, paymentMapper);

//* Use cases
export const createPaymentPlan = new CreatePaymentPlanUseCase(paymentRepository);

export const getStudentPaymentPlans = new GetStudentPaymentPlansUseCase(paymentRepository);

export const processQuotaPayment = new ProcessQuotaPaymentUseCase(paymentRepository);

export const revertQuotaPayment = new RevertQuotaPaymentUseCase(paymentRepository);