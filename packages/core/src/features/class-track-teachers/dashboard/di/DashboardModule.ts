import { GetDashboardSummaryUseCase } from "@salc/core/features/class-track-teachers/dashboard/application/use-cases/getDashboardSummary.use-case";
import { DashboardDataSourceImpl } from "@salc/core/features/class-track-teachers/dashboard/infrastructure/datasources/dashboard.datasource.impl";
import { DashboardRepositoryImpl } from "@salc/core/features/class-track-teachers/dashboard/infrastructure/repositories/Dashboard.repository.impl";
import { DashboardSummaryMapperImpl } from "@salc/core/features/class-track-teachers/dashboard/infrastructure/mappers/dashboardSummary.mapper";
import { dashboardSummarySchema } from "@salc/core/features/class-track-teachers/dashboard/infrastructure/schemas/DashboardSummary.schema";
import { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";
import { validatorFactory } from "@salc/core/adapters";

import { api } from "@salc/core/lib";

//* Validators
const dashboardSummaryValidator = validatorFactory.createValidator<DashboardSummaryEntity>(dashboardSummarySchema);

//* Mappers
const dashboardSummaryMapper = new DashboardSummaryMapperImpl(dashboardSummaryValidator);

//* Datasource
const dashboardDataSource = new DashboardDataSourceImpl(api, dashboardSummaryMapper);

//* Repositories
const dashboardRepository = new DashboardRepositoryImpl(dashboardDataSource);

//* Use Cases
export const getDashboardSummaryUseCase = new GetDashboardSummaryUseCase(dashboardRepository);
