import { useEndAttendanceSessionForm } from "@/features/class-track/attendance/application/hooks/forms/useEndAttendanceSessionForm.use";
import { useStartAttendanceSessionForm } from "@/features/class-track/attendance/application/hooks/forms/useStartAttendanceSessionForm.use";
import { useGetInProgressSessions } from "@/features/class-track/attendance/application/hooks/use-cases/useGetInProgressSessions.use";
import { useGetPendingApprovalSessions } from "@/features/class-track/attendance/application/hooks/use-cases/useGetPendingApprovalSessions.use";
import type { BaseStudentInClass } from "@/features/class-track/attendance/presentation/interfaces/BaseStudentInClass.interface";
import { EndSessionFormMapper } from "@/features/class-track/attendance/presentation/mappers/endSessionForm.mapper";
import { SessionStatusBadge } from "@/core/components/class-track/shared/Badges";
import { SessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";

import { CheckCheck, PlusCircle, UserPlus } from "lucide-react";

export default function AccessControlView() {
    //* Queries
    const { data: sessionsList, isLoading: isLoadingInProgress } = useGetInProgressSessions();
    const { data: pendingApprovals, isLoading: isLoadingPending } = useGetPendingApprovalSessions();

    const activeSessionsList = sessionsList ?? [];
    const pendingApprovalsList = pendingApprovals ?? [];

    //* hooks
    const { isSubmitting, onSubmit } = useEndAttendanceSessionForm();
    const { startForm, isSubmittingStartForm, onSubmitStartForm, handleChangeStartForm } = useStartAttendanceSessionForm();

    const handleApproveAll = () => {
        for (const element of pendingApprovalsList) {
            handleApproveOne(element);
        }
    };

    const handleApproveOne = (student: BaseStudentInClass) => {
        const studentBaseEndSession = EndSessionFormMapper.toBaseEndSessionFormValues(student, "TODO-teacherId");

        onSubmit(studentBaseEndSession);
    };

    const handleManualEntry = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmitStartForm();
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-title">Control de Acceso</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Gestion de entradas y salidas del aula</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Manual Entry Form */}
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        <div className="px-5 py-4 border-b border-border/50 flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-title" />
                            <h2 className="font-semibold text-foreground text-sm">Entrada Manual</h2>
                        </div>
                        <form onSubmit={handleManualEntry} className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                    Cedula del Estudiante
                                </label>
                                <input
                                    type="text"
                                    value={startForm?.studentId || ""}
                                    onChange={(e) => handleChangeStartForm(e)}
                                    placeholder="Ej. V-12345678"
                                    className="w-full px-3 py-2.5 bg-background border border-input rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                    Hora de Entrada
                                </label>
                                <input
                                    type="time"
                                    value={startForm?.entryTime || ""}
                                    onChange={(e) => handleChangeStartForm(e)}
                                    className="w-full px-3 py-2.5 bg-background border border-input rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    className="w-full px-3 py-2.5 bg-background border border-input rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
                                />
                            </div>
                            {isSubmittingStartForm && (
                                <div className="p-3 bg-primary/20 rounded-lg text-primary-foreground text-sm font-medium text-center">
                                    Registrando entrada...
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmittingStartForm}
                                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Registrar Entrada
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Sessions Table */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
                            <h2 className="font-semibold text-foreground text-sm">Sesiones Activas</h2>
                            <span className="text-xs bg-primary/20 text-primary-foreground font-semibold px-2 py-0.5 rounded-full">
                                {activeSessionsList.length} en clase
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-primary/10">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                            Estudiante
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                            Cedula
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                            Entrada
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {activeSessionsList.map((session) => (
                                        <tr key={session.sessionId} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                                        <span className="text-primary-foreground text-xs font-bold">
                                                            {session.fullName.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium text-foreground">{session.fullName}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground font-mono text-xs">
                                                {session.studentId}
                                            </td>
                                            <td className="px-5 py-3 font-semibold text-primary-foreground">
                                                {session.entryTime.toString()}
                                            </td>
                                            <td className="px-5 py-3">
                                                <SessionStatusBadge status={SessionStatus.InProgress} />
                                            </td>
                                        </tr>
                                    ))}
                                    {activeSessionsList.length === 0 && !isLoadingInProgress && (
                                        <tr>
                                            <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground text-sm">
                                                No hay sesiones activas en este momento
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Approvals Table */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-foreground text-sm">Cola de Salidas Pendientes</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Solicitudes de salida que requieren aprobacion manual
                                </p>
                            </div>
                            {pendingApprovalsList.length > 0 && (
                                <button
                                    onClick={handleApproveAll}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
                                >
                                    <CheckCheck className="w-3.5 h-3.5" />
                                    Aprobar Todos
                                </button>
                            )}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-accent/10">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wide">
                                            Estudiante
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wide">
                                            Entrada
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wide">
                                            Estado
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wide">
                                            Accion
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {isLoadingPending ? (
                                        <tr>
                                            <td colSpan={4} className="px-5 py-4 text-center text-muted-foreground">
                                                Cargando...
                                            </td>
                                        </tr>
                                    ) : (
                                        pendingApprovalsList.map((session) => (
                                            <tr key={session.sessionId} className="hover:bg-accent/5 transition-colors">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                                                            <span className="text-accent-foreground text-xs font-bold">
                                                                {session.fullName.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-foreground">{session.fullName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 font-semibold text-foreground">
                                                    {session.entryTime.toString()}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <SessionStatusBadge status={SessionStatus.PendingApproval} />
                                                </td>
                                                <td className="px-5 py-3">
                                                    <button
                                                        onClick={() => handleApproveOne(session)}
                                                        disabled={isSubmitting}
                                                        className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-foreground hover:text-primary transition-all disabled:opacity-50"
                                                    >
                                                        Aprobar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    {pendingApprovalsList.length === 0 && !isLoadingPending && (
                                        <tr>
                                            <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground text-sm">
                                                No hay salidas pendientes de aprobacion
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
