import { StudentRepositoryImpl } from "../infrastructure/repositories/Student.repository";
import { RegisterStudentUseCase } from "../application/useCases/RegisterStudent.useCase";
import { SearchStudentsUseCase } from "../application/useCases/SearchStudents.useCase";
import { UpdateStudentUseCase } from "../application/useCases/UpdateStudent.useCase";
import { ChangeContractStatusUseCase } from "../application/useCases/ChangeContractStatus.useCase";
import { ToggleGraduatedUseCase } from "../application/useCases/ToggleGraduated.useCase";
import { DeactivateStudentUseCase } from "../application/useCases/DeactivateStudent.useCase";

//* Repositories
const studentRepository = new StudentRepositoryImpl();

//* Use Cases
export const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);
export const searchStudentsUseCase = new SearchStudentsUseCase(studentRepository);
export const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
export const changeContractStatusUseCase = new ChangeContractStatusUseCase(studentRepository);
export const toggleGraduatedUseCase = new ToggleGraduatedUseCase(studentRepository);
export const deactivateStudentUseCase = new DeactivateStudentUseCase(studentRepository);


