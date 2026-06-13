import { ChangeContractStatusUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/changeContractStatus.use-case";
import { DeactivateStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/deactivateStudent.use-case";
import { GetAllStudentsUseCaseImpl } from "@salc/core/features/admin-desk/students/application/use-cases/getAllStudents.use-case";
import { RegisterStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/registerStudent.use-case";
import { ToggleGraduatedUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/toggleGraduated.use-case";
import { SearchStudentsByCriteriaUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/searchStudentsByCriteria.use-case";
import { StudentDataSourceImpl } from "@salc/core/features/admin-desk/students/infrastructure/datasources/student.datasource.impl";
import { StudentRepositoryImpl } from "@salc/core/features/admin-desk/students/infrastructure/repositories/Student.repository.impl";
import { SearchStudentsUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/searchStudents.use-case";
import { UpdateStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/updateStudent.use-case";
import { StudentMapperImpl } from "@salc/core/features/admin-desk/students/infrastructure/mappers/student.mapper";
import {
    arrayStudentsSchema,
    studentSchema,
} from "@salc/core/features/admin-desk/students/infrastructure/schemas/Student.schema";
import { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Validators
const studentValidator = validatorFactory.createValidator<StudentEntity>(studentSchema);
const arrayStudentValidator = validatorFactory.createValidator<StudentEntity[]>(arrayStudentsSchema);

//* Mapper
const studentMapper = new StudentMapperImpl(studentValidator, arrayStudentValidator);

//* Datasource
const studentDataSource = new StudentDataSourceImpl(api, studentMapper);

//* Repositories
const studentRepository = new StudentRepositoryImpl(studentDataSource);

//* Use Cases
export const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);

export const searchStudentsUseCase = new SearchStudentsUseCase(studentRepository);

export const getAllStudentsUseCase = new GetAllStudentsUseCaseImpl(studentRepository);

export const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);

export const changeContractStatusUseCase = new ChangeContractStatusUseCase(studentRepository);

export const toggleGraduatedUseCase = new ToggleGraduatedUseCase(studentRepository);

export const deactivateStudentUseCase = new DeactivateStudentUseCase(studentRepository);

export const searchStudentsByCriteriaUseCase = new SearchStudentsByCriteriaUseCase(studentRepository);
