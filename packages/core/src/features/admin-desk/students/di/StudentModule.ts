import { ChangeContractStatusUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/ChangeContractStatus.use-case";
import { DeactivateStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/DeactivateStudent.use-case";
import { GetAllStudentsUseCaseImpl } from "@salc/core/features/admin-desk/students/application/use-cases/GetAllStudents.use-case";
import { RegisterStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/RegisterStudent.use-case";
import { ToggleGraduatedUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/ToggleGraduated.use-case";
import { StudentRepositoryImpl } from "@salc/core/features/admin-desk/students/infrastructure/repositories/Student.repository";
import { SearchStudentsUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/SearchStudents.use-case";
import { UpdateStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/UpdateStudent.use-case";
import { StudentMapperImpl } from "@salc/core/features/admin-desk/students/infrastructure/mappers/Student.mapper";
import { arrayStudentsSchema, studentSchema } from "@salc/core/features/admin-desk/students/infrastructure/schemas/Student.schema";
import { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";



//* Validators
const studentValidator = validatorFactory.createValidator<StudentEntity>(studentSchema);
const arrayStudentValidator = validatorFactory.createValidator<StudentEntity[]>(arrayStudentsSchema);

//* Mapper
const studentMapper = new StudentMapperImpl(studentValidator, arrayStudentValidator);

//* Repositories
const studentRepository = new StudentRepositoryImpl(api, studentMapper);

//* Use Cases
export const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);

export const searchStudentsUseCase = new SearchStudentsUseCase(studentRepository);

export const getAllStudentsUseCase = new GetAllStudentsUseCaseImpl(studentRepository);

export const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);

export const changeContractStatusUseCase = new ChangeContractStatusUseCase(studentRepository);

export const toggleGraduatedUseCase = new ToggleGraduatedUseCase(studentRepository);

export const deactivateStudentUseCase = new DeactivateStudentUseCase(studentRepository);

