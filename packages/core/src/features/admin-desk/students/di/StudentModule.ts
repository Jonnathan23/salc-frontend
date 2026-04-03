import { StudentRepositoryImpl } from "../infrastructure/repositories/Student.repository";
import { RegisterStudentUseCase } from "../application/use-cases/RegisterStudent.use-case";
import { SearchStudentsUseCase } from "../application/use-cases/SearchStudents.use-case";
import { UpdateStudentUseCase } from "../application/use-cases/UpdateStudent.use-case";
import { ChangeContractStatusUseCase } from "../application/use-cases/ChangeContractStatus.use-case";
import { ToggleGraduatedUseCase } from "../application/use-cases/ToggleGraduated.use-case";
import { DeactivateStudentUseCase } from "../application/use-cases/DeactivateStudent.use-case";

//* Repositories
const studentRepository = new StudentRepositoryImpl();

//* Use Cases
export const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);
export const searchStudentsUseCase = new SearchStudentsUseCase(studentRepository);
export const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
export const changeContractStatusUseCase = new ChangeContractStatusUseCase(studentRepository);
export const toggleGraduatedUseCase = new ToggleGraduatedUseCase(studentRepository);
export const deactivateStudentUseCase = new DeactivateStudentUseCase(studentRepository);


