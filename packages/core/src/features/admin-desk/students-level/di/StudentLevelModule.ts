import { StudentLevelDataSourceImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/datasources/stundet-levl.datasource.impl";
import { GetStudentContractsUseCaseImpl } from "@salc/core/features/admin-desk/students-level/application/use-cases/getStudentContracts.use-case";
import { UpdateStudentLevelUseCaseImpl } from "@salc/core/features/admin-desk/students-level/application/use-cases/updateStudentLevel.use-case";
import { DeleteStudentLevelUseCaseImpl } from "@salc/core/features/admin-desk/students-level/application/use-cases/deleteStudentLevel.use-case";
import { StudentLevelRepositoryImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/repositories/student-level.repository";
import { PurchaseModulesUseCaseImpl } from "@salc/core/features/admin-desk/students-level/application/use-cases/purchaseModules.use-case";
import type { StudentLevelMapperProps } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/student-level.mapper";
import { StudentLevelMapperImpl } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/student-level.mapper";
import { studentLevelSchema } from "@salc/core/features/admin-desk/students-level/infrastructure/schemas/student-level.schema";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Adapter Factory
const studentLevelValidator = validatorFactory.createValidator<StudentLevelMapperProps>(studentLevelSchema);

//* Mapper
export const studentLevelMapper = new StudentLevelMapperImpl(studentLevelValidator);

//* Datasource
export const studentLevelDatasource = new StudentLevelDataSourceImpl(api, studentLevelMapper);

//* Repository
export const studentLevelRepository = new StudentLevelRepositoryImpl(studentLevelDatasource);

//* Use Cases
export const purchaseModulesUseCase = new PurchaseModulesUseCaseImpl(studentLevelRepository);
export const getStudentContractsUseCase = new GetStudentContractsUseCaseImpl(studentLevelRepository);
export const updateStudentLevelUseCase = new UpdateStudentLevelUseCaseImpl(studentLevelRepository);
export const deleteStudentLevelUseCase = new DeleteStudentLevelUseCaseImpl(studentLevelRepository);
