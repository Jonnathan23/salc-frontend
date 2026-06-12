import { useState, useMemo } from "react";
import { AlertTriangle, X, Calendar, Phone, MessageSquare, Loader2, FileText, Filter } from "lucide-react";

import {
    retentionAlertStatus,
    type RetentionAlertStatus,
} from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";

import { AlertStatusBadge, ContractStatusBadge } from "@/core/components/class-track/shared/Badges";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/Select";
import type { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces";
import { useRetentionAlertForm } from "@/features/class-track/feats/retention-center/application/hooks/forms/useRetentionAlertForm.hook";

import { useGetHistorialAlerts } from "@/features/class-track/feats/retention-center/application/hooks/use-cases/useGetHistorialAlerts.hook";
import type {
    AlertsResolvedParameters,
    RetetionAlertsActives,
} from "@/features/class-track/feats/retention-center/presentation/interfaces/AlertsHooks.interface";
import { useGetRetetionAlertsActives } from "@/features/class-track/feats/retention-center/application/hooks/use-cases/useGetRetentionAlerts.hook";

export function RetentionCenterView() {
    //* hooks
    const [selectedAlert, setSelectedAlert] = useState<RetentionAlertWithStudentProjection | null>(null);

    const handleCloseModal = () => setSelectedAlert(null);

    const { formValues, handleChange, handleSubmit, isSubmitting } = useRetentionAlertForm(selectedAlert, handleCloseModal);

    const [alertsDataFilters, setAlertsDataFilters] = useState<RetetionAlertsActives>();
    const [historialDataFilters, setHistorialDataFilters] = useState<AlertsResolvedParameters>();

    //* Queries
    const {
        data: alertsData,
        isLoading: isLoadingAlerts,
        isFetching: isFetchingAlerts,
    } = useGetRetetionAlertsActives(alertsDataFilters);
    const {
        data: historialData,
        isLoading: isLoadingHistorial,
        isFetching: isFetchingHistorial,
    } = useGetHistorialAlerts(historialDataFilters);

    //* memos
    const allAlerts = useMemo(() => alertsData?.data || [], [alertsData]);
    const historialAlerts = useMemo(() => historialData?.data || [], [historialData]);

    //* handlers
    const handleRowClick = (alert: RetentionAlertWithStudentProjection) => {
        setSelectedAlert(alert);
    };

    const handleSetFilterAlert = (status: RetetionAlertsActives) => {
        setAlertsDataFilters(status);
    };

    const handleSetFilterHistorial = (status: AlertsResolvedParameters) => {
        setHistorialDataFilters(status);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-title">Centro de Retencion</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Seguimiento de estudiantes en riesgo de abandono</p>
                </div>
                <div className="flex gap-3">
                    <div className="text-center bg-card rounded-xl border border-border px-4 py-3">
                        <p className="text-2xl font-bold text-destructive">{allAlerts.length}</p>
                        <p className="text-xs text-muted-foreground">Pendientes</p>
                    </div>
                    <div className="text-center bg-card rounded-xl border border-border px-4 py-3">
                        <p className="text-2xl font-bold text-primary">{historialAlerts.length}</p>
                        <p className="text-xs text-muted-foreground">Resueltos</p>
                    </div>
                </div>
            </div>

            {/* Pending Alerts */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <h2 className="font-semibold text-title text-sm">Alertas Activas</h2>
                    <span className="ml-auto text-xs bg-destructive/10 text-destructive font-semibold px-2 py-0.5 rounded-full">
                        {allAlerts.length} alertas
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <div className="flex items-center justify-between px-5 py-3 bg-muted/30">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Filtrar por estado:</span>
                        </div>
                        <Select
                            value={alertsDataFilters || "all"}
                            onValueChange={(value) =>
                                handleSetFilterAlert(value === "all" ? undefined : (value as RetetionAlertsActives))
                            }
                        >
                            <SelectTrigger className="w-[180px] bg-background">
                                <SelectValue placeholder="Todos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value={retentionAlertStatus.Pending}>Pendiente</SelectItem>
                                    <SelectItem value={retentionAlertStatus.InProgress}>En Progreso</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-muted/50">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-destructive uppercase tracking-wide">
                                    Estudiante
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-destructive uppercase tracking-wide">
                                    Contrato
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-destructive uppercase tracking-wide">
                                    Dias Ausente
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-destructive uppercase tracking-wide">
                                    Contacto
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-destructive uppercase tracking-wide">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoadingAlerts || isFetchingAlerts ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-8 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                            <span>Cargando alertas...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                allAlerts.map((alert) => (
                                    <tr
                                        key={alert.id}
                                        onClick={() => handleRowClick(alert)}
                                        className="hover:bg-muted/30 transition-colors cursor-pointer"
                                    >
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center flex-shrink-0">
                                                    <span className="text-destructive-foreground text-xs font-bold">
                                                        {alert.student.fullName.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{alert.student.fullName}</p>
                                                    <p className="text-xs text-muted-foreground">{alert.student.phoneNumber}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <ContractStatusBadge status={alert.student.contractStatus as StudentContractStatus} />
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`font-bold text-lg ${alert.daysAbsent >= 14 ? "text-destructive" : "text-secondary"}`}
                                            >
                                                {alert.daysAbsent}
                                            </span>
                                            <span className="text-muted-foreground text-xs ml-1">dias</span>
                                        </td>
                                        <td className="px-5 py-3">
                                            {alert.contactDate ? (
                                                <span className="text-foreground text-xs">
                                                    {new Date(alert.contactDate).toLocaleDateString("es-VE", { timeZone: "UTC" })}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground text-xs italic">Sin contacto</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3">
                                            <AlertStatusBadge alertStatus={alert.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-muted-foreground text-xs py-2 bg-muted/50">
                    Haz clic en una fila para gestionar la alerta
                </p>
            </div>

            {/* Resolved Alerts */}
            {historialAlerts.length > 0 && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                        <h2 className="font-semibold text-title text-sm">Historial de Alertas</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex items-center justify-between px-5 py-3 bg-muted/30">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Filtrar por estado:</span>
                            </div>
                            <Select
                                value={historialDataFilters || "all"}
                                onValueChange={(value) =>
                                    handleSetFilterHistorial(value === "all" ? undefined : (value as AlertsResolvedParameters))
                                }
                            >
                                <SelectTrigger className="w-[180px] bg-background">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">Todos</SelectItem>
                                        <SelectItem value={retentionAlertStatus.Resolved}>Resuelto</SelectItem>
                                        <SelectItem value={retentionAlertStatus.ClosedFrozen}>Cerrado Frozen</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wide">
                                        Estudiante
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wide">
                                        Dias Ausente
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wide">
                                        Justificado
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wide">
                                        Razon
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wide">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {isLoadingHistorial || isFetchingHistorial ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-8 text-center">
                                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                                <span>Cargando historial...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    historialAlerts.map((alert) => (
                                        <tr key={alert.id} className="opacity-70">
                                            <td className="px-5 py-3 font-medium text-foreground">{alert.student.fullName}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{alert.daysAbsent} dias</td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`text-xs font-semibold ${alert.isJustified ? "text-primary" : "text-destructive"}`}
                                                >
                                                    {alert.isJustified ? "Si" : "No"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground text-xs italic">
                                                {alert.justificationReason || "—"}
                                            </td>
                                            <td className="px-5 py-3">
                                                <AlertStatusBadge alertStatus={alert.status as RetentionAlertStatus} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal / Slide-over */}
            {selectedAlert && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="flex-1 bg-black/30" onClick={handleCloseModal} />
                    <div className="w-full max-w-md bg-card shadow-2xl flex flex-col h-full overflow-y-auto">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
                            <div>
                                <h3 className="font-bold text-title">Gestionar Alerta</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">{selectedAlert.student.fullName}</p>
                            </div>
                            <button onClick={handleCloseModal} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                        {/* TODO: crear zona de peligro
                         * En esta zona es para consumir los mutations del cambio de estado de la alerta a
                         * Resolved y ClosedFrozen
                         */}

                        {/* Student Info */}
                        <div className="px-6 py-4 bg-muted">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold">
                                        {selectedAlert.student.fullName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{selectedAlert.student.fullName}</p>
                                    <p className="text-xs text-muted-foreground">{selectedAlert.student.identificationCard}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                        <Phone className="w-3 h-3" /> {selectedAlert.student.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 p-3 bg-background rounded-lg">
                                <p className="text-sm font-semibold text-destructive">
                                    {selectedAlert.daysAbsent} dias de ausencia
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="flex-1 px-6 py-5 space-y-5">
                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                    <Calendar className="w-3.5 h-3.5" /> Fecha de Contacto
                                </label>
                                <input
                                    type="date"
                                    value={formValues.contactDate}
                                    onChange={(e) => handleChange("contactDate", e.target.value)}
                                    className="w-full px-3 py-2.5 border border-border rounded-lg text-foreground bg-background text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <label className="text-sm font-medium text-foreground">Respondio al contacto</label>
                                <button
                                    onClick={() => handleChange("hasResponded", !formValues.hasResponded)}
                                    className={`w-11 h-6 rounded-full transition-all relative ${formValues.hasResponded ? "bg-primary" : "bg-muted-foreground/30"}`}
                                >
                                    <span
                                        className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow transition-all ${formValues.hasResponded ? "left-5" : "left-0.5"}`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <label className="text-sm font-medium text-foreground">Ausencia justificada</label>
                                <button
                                    onClick={() => handleChange("isJustified", !formValues.isJustified)}
                                    className={`w-11 h-6 rounded-full transition-all relative ${formValues.isJustified ? "bg-primary" : "bg-muted-foreground/30"}`}
                                >
                                    <span
                                        className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow transition-all ${formValues.isJustified ? "left-5" : "left-0.5"}`}
                                    />
                                </button>
                            </div>

                            {formValues.isJustified && (
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                        <MessageSquare className="w-3.5 h-3.5" /> Razon de Justificacion
                                    </label>
                                    <textarea
                                        value={formValues.justificationReason}
                                        onChange={(e) => handleChange("justificationReason", e.target.value)}
                                        placeholder="Describe la razon de la ausencia..."
                                        rows={3}
                                        className="w-full px-3 py-2.5 border border-border rounded-lg text-foreground bg-background text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                    <Calendar className="w-3.5 h-3.5" /> Fecha Limite de Regreso
                                </label>
                                <input
                                    type="date"
                                    value={formValues.returnDeadline}
                                    onChange={(e) => handleChange("returnDeadline", e.target.value)}
                                    className="w-full px-3 py-2.5 border border-border rounded-lg text-foreground bg-background text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                    <FileText className="w-3.5 h-3.5" /> Observaciones Generales
                                </label>
                                <textarea
                                    value={formValues.observations}
                                    onChange={(e) => handleChange("observations", e.target.value)}
                                    placeholder="Agrega observaciones o acuerdos con el estudiante..."
                                    rows={4}
                                    className="w-full px-3 py-2.5 border border-border rounded-lg text-foreground bg-background text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-border flex gap-3">
                            <button
                                onClick={handleCloseModal}
                                disabled={isSubmitting}
                                className="flex-1 py-2.5 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground bg-primary transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    "Guardar Cambios"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
