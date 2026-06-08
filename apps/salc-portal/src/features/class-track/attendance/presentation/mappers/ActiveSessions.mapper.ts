import type { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import type { BaseStudentInClass } from "@/features/class-track/attendance/presentation/interfaces/BaseStudentInClass.interface";

export class ActiveSessionsMapper {
    public static toBaseStudentInClass(entity: StudentInClassProjection): BaseStudentInClass {
        return {
            sessionId: entity.sessionId,
            studentId: entity.studentId,
            fullName: entity.fullName,
            contractStatus: entity.contractStatus,
            entryTime: entity.entryTime,
        };
    }

    public static toArrayBaseStudentInClass(entities: StudentInClassProjection[]): BaseStudentInClass[] {
        const baseStudentInClass = entities.map((e) => {
            return ActiveSessionsMapper.toBaseStudentInClass(e);
        });

        return baseStudentInClass;
    }
}
