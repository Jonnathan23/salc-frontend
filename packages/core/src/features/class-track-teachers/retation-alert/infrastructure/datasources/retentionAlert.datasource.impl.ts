import type { UpdateRetentionAlertDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/UpdateRetentionAlert.dto";
import type { GetRetentionAlertsDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import type { ChangeRetentionAlertStatusDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/ChangeRetentionAlertStatus.dto";
import type { RetentionAlertMapper } from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/mappers/retentionAlert.mapper";
import type { RetentionAlertWithStudentMapper } from "@salc/core/features/class-track-teachers/retation-alert/infrastructure/mappers/retentionAlertWithStudent.mapper";
import { RetentionAlertDataSource } from "@salc/core/features/class-track-teachers/retation-alert/domain/datasources/retentionAlert.datasource";
import type { RetentionAlertEntity } from "@salc/core/features/class-track-teachers/retation-alert/domain/entities/RetentionAlert.entity";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";

export class RetentionAlertDataSourceImpl implements RetentionAlertDataSource {
    private readonly baseUrl = "/class-track/retention-alerts";

    constructor(
        private readonly api: MethodsHttp,
        private readonly retentionAlertMapper: RetentionAlertMapper,
        private readonly retentionAlertWithStudentMapper: RetentionAlertWithStudentMapper,
    ) {}

    async getAlerts(dto: GetRetentionAlertsDto): Promise<SuccessResponse<RetentionAlertWithStudentProjection[]>> {
        const queryParameters = {
            status: dto.status,
            page: dto.page,
            limit: dto.limit,
            studentParameter: dto.studentParameter,
            contractStatus: dto.contractStatus,
            daysAbsent: dto.daysAbsent,
            isJustified: dto.isJustified,
        };

        const rawResponse = await this.api.get<SuccessResponse<RetentionAlertWithStudentProjection[]>>(this.baseUrl, {
            parameters: queryParameters,
        });

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not fetch retention alerts");
        }

        const alerts = this.retentionAlertWithStudentMapper.toArrayProjections(rawResponse.data);

        return {
            ...rawResponse,
            data: alerts,
        };
    }

    async updateAlertInfo(id: string, dto: UpdateRetentionAlertDto): Promise<SuccessResponse<RetentionAlertEntity>> {
        const url = `${this.baseUrl}/${id}`;

        const rawResponse = await this.api.patch<SuccessResponse<RetentionAlertEntity>, UpdateRetentionAlertDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not update retention alert info");
        }

        const alert = this.retentionAlertMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: alert,
        };
    }

    async changeAlertStatus(id: string, dto: ChangeRetentionAlertStatusDto): Promise<SuccessResponse<RetentionAlertEntity>> {
        const url = `${this.baseUrl}/${id}/status`;

        const rawResponse = await this.api.patch<SuccessResponse<RetentionAlertEntity>, ChangeRetentionAlertStatusDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not change retention alert status");
        }

        const alert = this.retentionAlertMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: alert,
        };
    }
}
