import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

import { GetRetentionAlertsUseCase } from "@salc/core/features/class-track-teachers/retation-alert/application/use-cases/getRetentionAlerts.use-case";
import { UpdateRetentionAlertUseCase } from "@salc/core/features/class-track-teachers/retation-alert/application/use-cases/updateRetentionAlert.use-case";
import { ChangeRetentionAlertStatusUseCase } from "@salc/core/features/class-track-teachers/retation-alert/application/use-cases/changeRetentionAlertStatus.use-case";
import type { RetentionAlertEntity } from "@salc/core/features/class-track-teachers/retation-alert/domain/entities/RetentionAlert.entity";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import { RetentionAlertDataSourceImpl } from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/datasources/retentionAlert.datasource.impl";
import { RetentionAlertMapperImpl } from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/mappers/retentionAlert.mapper";
import { RetentionAlertWithStudentMapperImpl } from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/mappers/retentionAlertWithStudent.mapper";
import { RetentionAlertRepositoryImpl } from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/repositories/retentionAlert.repository.impl";
import {
    arrayRetentionAlertsSchema,
    retentionAlertSchema,
} from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/schemas/RetentionAlert.schema";
import {
    arrayRetentionAlertsWithStudentProjectionSchema,
    retentionAlertWithStudentProjectionSchema,
} from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/schemas/RetentionAlertWithStudent.schema";

//* Validators
const retentionAlertValidator = validatorFactory.createValidator<RetentionAlertEntity>(retentionAlertSchema);
const arrayRetentionAlertValidator = validatorFactory.createValidator<RetentionAlertEntity[]>(arrayRetentionAlertsSchema);

const retentionAlertWithStudentValidator = validatorFactory.createValidator<RetentionAlertWithStudentProjection>(
    retentionAlertWithStudentProjectionSchema,
);
const arrayRetentionAlertWithStudentValidator = validatorFactory.createValidator<RetentionAlertWithStudentProjection[]>(
    arrayRetentionAlertsWithStudentProjectionSchema,
);

//* Mappers
const retentionAlertMapper = new RetentionAlertMapperImpl(retentionAlertValidator, arrayRetentionAlertValidator);
const retentionAlertWithStudentMapper = new RetentionAlertWithStudentMapperImpl(
    retentionAlertWithStudentValidator,
    arrayRetentionAlertWithStudentValidator,
);

//* Datasource
const retentionAlertDataSource = new RetentionAlertDataSourceImpl(api, retentionAlertMapper, retentionAlertWithStudentMapper);

//* Repositories
const retentionAlertRepository = new RetentionAlertRepositoryImpl(retentionAlertDataSource);

//* Use Cases
export const getRetentionAlertsUseCase = new GetRetentionAlertsUseCase(retentionAlertRepository);
export const updateRetentionAlertUseCase = new UpdateRetentionAlertUseCase(retentionAlertRepository);
export const changeRetentionAlertStatusUseCase = new ChangeRetentionAlertStatusUseCase(retentionAlertRepository);
