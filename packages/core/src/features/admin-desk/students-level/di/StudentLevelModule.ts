import {
    GetStudentContractsUseCaseImpl,
    UpdateStudentLevelUseCaseImpl,
    DeleteStudentLevelUseCaseImpl,
    PurchaseModulesUseCaseImpl,
} from "@salc/core/features/admin-desk/students-level/application/use-cases";

import {
    arrayStudentLevelDetailsSchema,
    studentLevelDetailsSchema,
    arrayStudentLevelSchema,
    studentLevelSchema,
} from "@salc/core/features/admin-desk/students-level/infrastructure/schemas";

import { StudentLevelRepositoryImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/repositories/student-level.repository.impl";
import { StudentLevelDataSourceImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/datasources/studentLevel.datasource.impl";
import {
    StudentLevelDetailsMapperImpl,
    StudentLevelMapperImpl,
} from "@salc/core/features/admin-desk/students-level/infrastructure/mappers";
import { StudentLevelDetailsEntity, StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Adapter Factory
const studentLevelValidator = validatorFactory.createValidator<StudentLevelEntity>(studentLevelSchema);
const studentLevelValidatorArray = validatorFactory.createValidator<StudentLevelEntity[]>(arrayStudentLevelSchema);

const studentLevelDetailsValidator = validatorFactory.createValidator<StudentLevelDetailsEntity>(studentLevelDetailsSchema);
const studentLevelDetailsValidatorArray =
    validatorFactory.createValidator<StudentLevelDetailsEntity[]>(arrayStudentLevelDetailsSchema);

//* Mapper
export const studentLevelMapper = new StudentLevelMapperImpl(studentLevelValidator, studentLevelValidatorArray);
export const studentLevelDetailsMapper = new StudentLevelDetailsMapperImpl(
    studentLevelDetailsValidator,
    studentLevelDetailsValidatorArray,
);

//* Datasource
export const studentLevelDatasource = new StudentLevelDataSourceImpl(api, studentLevelMapper, studentLevelDetailsMapper);

//* Repository
export const studentLevelRepository = new StudentLevelRepositoryImpl(studentLevelDatasource);

//* Use Cases
export const purchaseModulesUseCase = new PurchaseModulesUseCaseImpl(studentLevelRepository);
export const getStudentContractsUseCase = new GetStudentContractsUseCaseImpl(studentLevelRepository);
export const updateStudentLevelUseCase = new UpdateStudentLevelUseCaseImpl(studentLevelRepository);
export const deleteStudentLevelUseCase = new DeleteStudentLevelUseCaseImpl(studentLevelRepository);
