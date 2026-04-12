import { PaymentRepositoryImpl } from "@salc/core/features/admin-desk/payments/infrastructure/repositories/Payment.repository";
import { CreatePaymentPlanUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/CreatePaymentPlan.use-case";
import { GetStudentPaymentPlansUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/GetStudentPaymentPlans.use-case";
import { ProcessQuotaPaymentUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/ProcessQuotaPayment.use-case";
import { RevertQuotaPaymentUseCase } from "@salc/core/features/admin-desk/payments/application/use-cases/RevertQuotaPayment.use-case";
import { api } from "@salc/core/lib";

const paymentRepository = new PaymentRepositoryImpl(api);

export const createPaymentPlan = new CreatePaymentPlanUseCase(paymentRepository);
export const getStudentPaymentPlans = new GetStudentPaymentPlansUseCase(paymentRepository);
export const processQuotaPayment = new ProcessQuotaPaymentUseCase(paymentRepository);
export const revertQuotaPayment = new RevertQuotaPaymentUseCase(paymentRepository);