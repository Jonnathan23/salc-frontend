import { z } from "zod";

import { moduleSchema } from "@salc/core/features/admin-desk/modules/infrastructure/schemas/module.schema";
import { studentSchema } from "@salc/core/features/admin-desk/students/infrastructure/schemas/Student.schema";
import { userSchema } from "@salc/core/features/shared/identity/infrastructure/schemas";


//* Student Level Details Schema
const studentSchemaRelation = studentSchema.pick({
    id: true,
    identificationCard: true,
    fullName: true,
    email: true,
    isGraduated: true,
    contractStatus: true,
});

const moduleSchemaRelation = moduleSchema.pick({
    mo_id: true,
    mo_name: true,
    mo_level: true
});

const sellerRelationSchema = userSchema.pick({
    us_id: true,
    us_full_name: true,
    us_email: true,
});



export const studentLevelDetailsSchema = z.object({
    id: z.string(),
    status: z.enum(["ACTIVE", "APPROVED", "LOCKED"]),
    purchaseDate: z.string(),
    module: moduleSchemaRelation,
    seller: sellerRelationSchema,
    student: studentSchemaRelation,
});

export const arrayStudentLevelDetailsSchema = z.array(studentLevelDetailsSchema);
