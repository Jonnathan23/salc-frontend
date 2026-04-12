import { StudentRepositoryImpl } from "@salc/core/features/admin-desk/students/infrastructure/repositories/Student.repository";
import { RegisterStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/RegisterStudent.use-case";
import { SearchStudentsUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/SearchStudents.use-case";
import { UpdateStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/UpdateStudent.use-case";
import { ChangeContractStatusUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/ChangeContractStatus.use-case";
import { ToggleGraduatedUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/ToggleGraduated.use-case";
import { DeactivateStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/DeactivateStudent.use-case";
import { GetAllStudentsUseCaseImpl } from "@salc/core/features/admin-desk/students/application/use-cases/GetAllStudents.use-case";
import { api } from "@salc/core/lib";

//* Repositories
const studentRepository = new StudentRepositoryImpl(api);

//* Use Cases
export const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);
export const searchStudentsUseCase = new SearchStudentsUseCase(studentRepository);
export const getAllStudentsUseCase = new GetAllStudentsUseCaseImpl(studentRepository);
export const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
export const changeContractStatusUseCase = new ChangeContractStatusUseCase(studentRepository);
export const toggleGraduatedUseCase = new ToggleGraduatedUseCase(studentRepository);
export const deactivateStudentUseCase = new DeactivateStudentUseCase(studentRepository);

