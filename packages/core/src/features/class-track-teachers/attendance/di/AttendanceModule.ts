import { validatorFactory } from "@salc/core/adapters";
import { EndAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/application/use-cases/endAttendanceSession.use-case";
import { StartAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/application/use-cases/startAttendanceSession.use-case";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import { AttendanceSessionDataSourceImpl } from "@salc/core/features/class-track-teachers/attendance/infrastructure/datasources/attendanceSession.datasource.impl";
import { AttendanceSessionMapperImpl } from "@salc/core/features/class-track-teachers/attendance/infrastructure/mappers/attendanceSession.mapper";
import { AttendanceSessionRepositoryImpl } from "@salc/core/features/class-track-teachers/attendance/infrastructure/repositories/AttendanceSession.repository.impl";
import { attendanceSessionSchema } from "@salc/core/features/class-track-teachers/attendance/infrastructure/schemas/AttendanceSession.schema";
import { api } from "@salc/core/lib";

//* Validators
const attendanceSessionValidator = validatorFactory.createValidator<AttendanceSessionEntity>(attendanceSessionSchema);

//* Mapper
const attendanceSessionMapper = new AttendanceSessionMapperImpl(attendanceSessionValidator);

//* Datasource
const attendanceSessionDataSource = new AttendanceSessionDataSourceImpl(api, attendanceSessionMapper);

//* Repositories
const attendanceSessionRepository = new AttendanceSessionRepositoryImpl(attendanceSessionDataSource);

//* Use Cases
export const startAttendanceSessionUseCase = new StartAttendanceSessionUseCase(attendanceSessionRepository);
export const endAttendanceSessionUseCase = new EndAttendanceSessionUseCase(attendanceSessionRepository);
