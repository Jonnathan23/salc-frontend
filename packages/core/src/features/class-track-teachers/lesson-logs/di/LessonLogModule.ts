import { CreateLessonLogsUseCase } from "@salc/core/features/class-track-teachers/lesson-logs/application/use-cases/createLessonLogs.use-case";
import { GetLastLessonLogUseCase } from "@salc/core/features/class-track-teachers/lesson-logs/application/use-cases/getLastLessonLog.use-case";
import { LessonLogDataSourceImpl } from "@salc/core/features/class-track-teachers/lesson-logs/infrastructure/datasources/lessonLog.datasource.impl";
import { LessonLogRepositoryImpl } from "@salc/core/features/class-track-teachers/lesson-logs/infrastructure/repositories/lessonLog.repository.impl";
import { LessonLogMapperImpl } from "@salc/core/features/class-track-teachers/lesson-logs/infrastructure/mappers/lessonLog.mapper";
import {
    arrayLessonLogsSchema,
    lessonLogSchema,
} from "@salc/core/features/class-track-teachers/lesson-logs/infrastructure/schemas/LessonLog.schema";
import type { LessonLogEntity } from "@salc/core/features/class-track-teachers/lesson-logs/domain/entities/LessonLog.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Validators
const lessonLogValidator = validatorFactory.createValidator<LessonLogEntity>(lessonLogSchema);
const arrayLessonLogValidator = validatorFactory.createValidator<LessonLogEntity[]>(arrayLessonLogsSchema);

//* Mapper
const lessonLogMapper = new LessonLogMapperImpl(lessonLogValidator, arrayLessonLogValidator);

//* Datasource
const lessonLogDataSource = new LessonLogDataSourceImpl(api, lessonLogMapper);

//* Repositories
const lessonLogRepository = new LessonLogRepositoryImpl(lessonLogDataSource);

//* Use Cases
export const createLessonLogsUseCase = new CreateLessonLogsUseCase(lessonLogRepository);
export const getLastLessonLogUseCase = new GetLastLessonLogUseCase(lessonLogRepository);
