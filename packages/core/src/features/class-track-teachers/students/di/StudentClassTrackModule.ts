import { SearchStudentsUseCase } from "@salc/core/features/class-track-teachers/students/application/use-cases/searchStudents.use-case";
import { StudentDatasourceClassTrackImpl } from "@salc/core/features/class-track-teachers/students/infrastructure/datasources/studentClassTrack.datasource.impl";
import { StudentRepositoryClassTrackImpl } from "@salc/core/features/class-track-teachers/students/infrastructure/repositories/studentClassTrack.repository.impl";
import { StudentMapperClassTrackImpl } from "@salc/core/features/class-track-teachers/students/infrastructure/mappers/studentClassTrack.mapper";
import {
    arrayStudentClassTrackSchema,
    studentClassTrackSchema,
} from "@salc/core/features/class-track-teachers/students/infrastructure/schemas/StudentClassTrack.schema";
import { StudentClassTrackEntity } from "@salc/core/features/class-track-teachers/students/domain/entities/StudentClassTrack.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Validators
const studentValidator = validatorFactory.createValidator<StudentClassTrackEntity>(studentClassTrackSchema);
const arrayStudentValidator = validatorFactory.createValidator<StudentClassTrackEntity[]>(arrayStudentClassTrackSchema);

//* Mapper
const studentMapper = new StudentMapperClassTrackImpl(studentValidator, arrayStudentValidator);

//* Datasource
const studentDataSource = new StudentDatasourceClassTrackImpl(api, studentMapper);

//* Repositories
const studentRepository = new StudentRepositoryClassTrackImpl(studentDataSource);

//* Use Cases
export const searchStudentsUseCase = new SearchStudentsUseCase(studentRepository);
