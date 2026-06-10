import { format } from "date-fns";
import type { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";
import type { DashboardSummaryViewModel } from "@/features/class-track/dashboard/presentation/interfaces/DashboardSummaryViewModel.interface";

export class DashboardSummaryMapper {
    public static toViewModel(entity: DashboardSummaryEntity): DashboardSummaryViewModel {
        const { studentsInsideCount, pendingCheckoutsCount, activeAlertsCount, activeContractsCount } = entity;

        const studentsInClass = entity.studentsInClass.map((student) => ({
            ...student,
            entryTime: format(student.entryTime, "hh:mm a"),
        }));

        return {
            studentsInsideCount,
            pendingCheckoutsCount,
            activeAlertsCount,
            activeContractsCount,
            studentsInClass,
        };
    }
}
