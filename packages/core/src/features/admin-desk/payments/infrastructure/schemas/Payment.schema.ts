import { z } from "zod";

export const paymentQuotaSchema = z.object({
    id: z.string(),
    paymentPlanId: z.string(),
    quotaNumber: z.number(),
    paymentMethod: z.string().nullable().optional(),
    baseAmount: z.number(),
    rolloverDebt: z.number(),
    totalExpected: z.number(),
    amountPaid: z.number(),
    dueDate: z.string().or(z.date()),
    status: z.string(),
    createdAt: z.string().or(z.date()).optional(),
    updatedAt: z.string().or(z.date()).optional(),
});

export const paymentPlanSchema = z.object({
    id: z.string(),
    studentId: z.string(),
    sellerId: z.string(),
    enrollmentFee: z.number(),
    totalAmount: z.number(),
    isSinglePayment: z.boolean(),
    status: z.string(),
    quotas: z.array(paymentQuotaSchema).optional(),
    createdAt: z.string().or(z.date()).optional(),
    updatedAt: z.string().or(z.date()).optional(),
});

export const arrayPaymentPlansSchema = z.array(paymentPlanSchema);
