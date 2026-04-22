import { SuccessResponseZodValidator } from "@salc/core/adapters/data-acces-layer/zod/SuccessResponseZodValidator.adapter";
import { ZodValidatorFactory } from "@salc/core/adapters/data-acces-layer/zod/ZodValidatorFactory.adapter";
import type { SuccessResponse } from "@salc/core/interfaces";
import type { EntityValidator, ValidatorFactory } from "@salc/core/interfaces/EntityValidator";


export const validatorFactory: ValidatorFactory = new ZodValidatorFactory();

export const nullResponseValidator: EntityValidator<SuccessResponse<null>> = new SuccessResponseZodValidator<null>();