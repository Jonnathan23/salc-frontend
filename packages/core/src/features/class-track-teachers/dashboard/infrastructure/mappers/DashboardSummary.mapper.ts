import { CustomError } from "@salc/core/enums";
import { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";
import { StudentInClassDashboardEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/StudentInClass.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

export interface DashboardSummaryMapper {
    toEntity(rawObject: DashboardSummaryMapperProps): DashboardSummaryEntity;
}

type DashboardSummaryMapperProps = Record<string, unknown> | unknown | null | undefined;

export class DashboardSummaryMapperImpl implements DashboardSummaryMapper {
    /**
     * @param validator - EntityValidator<DashboardSummaryEntity>
     */
    constructor(private readonly validator: EntityValidator<DashboardSummaryEntity>) {}

    toEntity(rawObject: DashboardSummaryMapperProps): DashboardSummaryEntity {
        if (!rawObject) {
            throw CustomError.notFound("Dashboard summary data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        const studentsInClass = validationResponse.studentsInClass.map(
            (student) =>
                new StudentInClassDashboardEntity(
                    student.sessionId,
                    student.studentId,
                    student.fullName,
                    student.contractStatus,
                    new Date(student.entryTime),
                ),
        );

        return new DashboardSummaryEntity(
            validationResponse.studentsInsideCount,
            validationResponse.pendingCheckoutsCount,
            validationResponse.activeAlertsCount,
            validationResponse.activeContractsCount,
            studentsInClass,
        );
    }
}
