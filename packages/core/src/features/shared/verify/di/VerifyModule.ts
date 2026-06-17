import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

import { VerifyUserUseCase } from "@salc/core/features/shared/verify/application/use-cases/verifyUser.use-case";
import { VerifyStudentUseCase } from "@salc/core/features/shared/verify/application/use-cases/verifyStudent.use-case";
import { VerifyDataSourceImpl } from "@salc/core/features/shared/verify/infrastructure/datasources/verify.datasource.impl";
import { VerifyRepositoryImpl } from "@salc/core/features/shared/verify/infrastructure/repositories/verify.repository.impl";
import { VerifyMapperImpl } from "@salc/core/features/shared/verify/infrastructure/mappers/verify.mapper";
import {
    userTokenPayloadSchema,
    studentTokenPayloadSchema,
} from "@salc/core/features/shared/verify/infrastructure/schemas/Verify.schema";

import type { UserTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/UserTokenPayload.model";
import type { StudentTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";

//* Validators
const userPayloadValidator = validatorFactory.createValidator<UserTokenPayloadEntity>(userTokenPayloadSchema);
const studentPayloadValidator = validatorFactory.createValidator<StudentTokenPayloadEntity>(studentTokenPayloadSchema);

//* Mapper
const verifyMapper = new VerifyMapperImpl(userPayloadValidator, studentPayloadValidator);

//* Datasource
const verifyDataSource = new VerifyDataSourceImpl(api, verifyMapper);

//* Repositories
const verifyRepository = new VerifyRepositoryImpl(verifyDataSource);

//* Use Cases
export const verifyUserUseCase = new VerifyUserUseCase(verifyRepository);
export const verifyStudentUseCase = new VerifyStudentUseCase(verifyRepository);
