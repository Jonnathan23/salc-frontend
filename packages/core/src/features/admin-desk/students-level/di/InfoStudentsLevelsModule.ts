import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

import { StudentSearchProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentSearchProjection.entity";
import { StudentTimelineProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";

import {
    arrayStudentSearchProjectionSchema,
    studentSearchProjectionSchema,
    studentTimelineProjectionSchema,
} from "@salc/core/features/admin-desk/students-level/infrastructure/schemas/InfoStudentsLevels.schema";

import { StudentSearchProjectionMapperImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/studentSearchProjection.mapper";
import {
    StudentTimelineProjectionMapperImpl,
    StudentTimelineInnerMapperImpl,
} from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/studentTimelineProjection.mapper";

import { InfoStudentsLevelsDataSourceImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/datasources/infoStudentsLevels.datasource.impl";
import { InfoStudentsLevelsRepositoryImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/repositories/infoStudentsLevels.repository.impl";

import { SearchStudentsLevelsUseCase } from "@salc/core/features/admin-desk/students-level/application/use-cases/searchStudentsLevels.use-case";
import { GetStudentTimelineUseCase } from "@salc/core/features/admin-desk/students-level/application/use-cases/getStudentTimeline.use-case";

//* Validators
const studentSearchValidator = validatorFactory.createValidator<StudentSearchProjectionEntity>(studentSearchProjectionSchema);
const arrayStudentSearchValidator = validatorFactory.createValidator<StudentSearchProjectionEntity[]>(
    arrayStudentSearchProjectionSchema,
);

const studentTimelineValidator =
    validatorFactory.createValidator<StudentTimelineProjectionEntity>(studentTimelineProjectionSchema);

//* Mappers
const studentSearchMapper = new StudentSearchProjectionMapperImpl(studentSearchValidator, arrayStudentSearchValidator);
const studentTimelineInnerMapper = new StudentTimelineInnerMapperImpl();
const studentTimelineMapper = new StudentTimelineProjectionMapperImpl(studentTimelineValidator, studentTimelineInnerMapper);

//* Datasource
const infoStudentsLevelsDataSource = new InfoStudentsLevelsDataSourceImpl(api, studentSearchMapper, studentTimelineMapper);

//* Repositories
const infoStudentsLevelsRepository = new InfoStudentsLevelsRepositoryImpl(infoStudentsLevelsDataSource);

//* Use Cases
export const searchStudentsLevelsUseCase = new SearchStudentsLevelsUseCase(infoStudentsLevelsRepository);
export const getStudentTimelineUseCase = new GetStudentTimelineUseCase(infoStudentsLevelsRepository);
