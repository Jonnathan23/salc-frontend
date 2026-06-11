import { validatorFactory } from "@salc/core/adapters";
import { EndAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/application/use-cases/EndAttendanceSession.use-case";
import { StartAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/application/use-cases/StartAttendanceSession.use-case";
import { ApproveAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/application/use-cases/approveAttendanceSession.use-case";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import { SessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";
import { AttendanceSessionDataSourceImpl } from "@salc/core/features/class-track-teachers/attendance/infrastructure/datasources/attendanceSession.datasource.impl";
import { AttendanceSessionMapperImpl } from "@salc/core/features/class-track-teachers/attendance/infrastructure/mappers/attendanceSession.mapper";
import { AttendanceSessionRepositoryImpl } from "@salc/core/features/class-track-teachers/attendance/infrastructure/repositories/AttendanceSession.repository.impl";
import { attendanceSessionSchema } from "@salc/core/features/class-track-teachers/attendance/infrastructure/schemas/AttendanceSession.schema";

import { GetActiveSessionsUseCase } from "@salc/core/features/class-track-teachers/attendance/application/use-cases/getActiveSessions.use-case";
import type { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import { studentInClassSchema } from "@salc/core/features/class-track-teachers/attendance/infrastructure/schemas/StudentInClass.schema";
import { StudentInClassMapperImpl } from "@salc/core/features/class-track-teachers/attendance/infrastructure/mappers/studentInClass.mapper";

import { api } from "@salc/core/lib";

//* Validators
const attendanceSessionValidator = validatorFactory.createValidator<AttendanceSessionEntity>(attendanceSessionSchema);
const studentInClassValidator = validatorFactory.createValidator<StudentInClassProjection>(studentInClassSchema);

//* Mapper
const attendanceSessionMapper = new AttendanceSessionMapperImpl(attendanceSessionValidator);
const studentInClassMapper = new StudentInClassMapperImpl(studentInClassValidator);

//* Datasource
const attendanceSessionDataSource = new AttendanceSessionDataSourceImpl(api, attendanceSessionMapper, studentInClassMapper);

//* Repositories
const attendanceSessionRepository = new AttendanceSessionRepositoryImpl(attendanceSessionDataSource);

//* Use Cases
export const startAttendanceSessionUseCase = new StartAttendanceSessionUseCase(attendanceSessionRepository);
export const endAttendanceSessionUseCase = new EndAttendanceSessionUseCase(attendanceSessionRepository);
export const approveAttendanceSessionUseCase = new ApproveAttendanceSessionUseCase(attendanceSessionRepository);

export const getApprovedSessionsUseCase = new GetActiveSessionsUseCase(attendanceSessionRepository, SessionStatus.Approved);
export const getInProgressSessionsUseCase = new GetActiveSessionsUseCase(attendanceSessionRepository, SessionStatus.InProgress);
export const getPendingApprovalSessionsUseCase = new GetActiveSessionsUseCase(
    attendanceSessionRepository,
    SessionStatus.PendingApproval,
);
