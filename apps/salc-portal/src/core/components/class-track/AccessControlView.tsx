import { useState } from "react";
import { PlusCircle, CheckCheck, UserPlus } from "lucide-react";

import { SessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";

export function AccessControlView() {
    const [pendingApprovals, setPendingApprovals] = useState(
        mockSessions.filter((s) => s.attendanceSessionStatus === SessionStatus.PendingApproval),
    );
    const [activeSessions] = useState(
        mockSessions.filter((s) => s.attendanceSessionStatus === SessionStatus.Active),
    );
    const [manualStudentId, setManualStudentId] = useState("");
    const [manualEntryTime, setManualEntryTime] = useState("");
    const [manualSuccess, setManualSuccess] = useState(false);

    const getStudent = (studentId: string) => {
        return mockStudents.find((s) => s.studentId === studentId);
    };

    const handleApproveAll = () => {
        setPendingApprovals([]);
    };

    const handleApproveOne = (sessionId: string) => {
        setPendingApprovals((prev) => prev.filter((s) => s.attendanceSessionId !== sessionId));
    };

    const handleManualEntry = (e: React.FormEvent) => {
        e.preventDefault();
        setManualSuccess(true);
        setManualStudentId("");
        setManualEntryTime("");
        setTimeout(() => setManualSuccess(false), 3000);
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--color-font)]">Control de Acceso</h1>
                <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Gestion de entradas y salidas del aula</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Manual Entry Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-[var(--color-font-title)]" />
                            <h2 className="font-semibold text-[var(--color-font)] text-sm">Entrada Manual</h2>
                        </div>
                        <form onSubmit={handleManualEntry} className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-font)] mb-1.5 uppercase tracking-wide">
                                    Cedula del Estudiante
                                </label>
                                <input
                                    type="text"
                                    value={manualStudentId}
                                    onChange={(e) => setManualStudentId(e.target.value)}
                                    placeholder="Ej. V-12345678"
                                    className="w-full px-3 py-2.5 border border-[var(--color-tertiary)]/40 rounded-lg text-[var(--color-font)] text-sm focus:outline-none focus:border-[var(--color-quinary)] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-font)] mb-1.5 uppercase tracking-wide">
                                    Hora de Entrada
                                </label>
                                <input
                                    type="time"
                                    value={manualEntryTime}
                                    onChange={(e) => setManualEntryTime(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-[var(--color-tertiary)]/40 rounded-lg text-[var(--color-font)] text-sm focus:outline-none focus:border-[var(--color-quinary)] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-font)] mb-1.5 uppercase tracking-wide">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    className="w-full px-3 py-2.5 border border-[var(--color-tertiary)]/40 rounded-lg text-[var(--color-font)] text-sm focus:outline-none focus:border-[var(--color-quinary)] transition-colors"
                                />
                            </div>
                            {manualSuccess && (
                                <div className="p-3 bg-[var(--color-primary)]/30 rounded-lg text-[var(--color-quinary)] text-sm font-medium text-center">
                                    Entrada registrada exitosamente
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={!manualStudentId || !manualEntryTime}
                                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                                style={{ background: "var(--color-font-title)" }}
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
                    <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center justify-between">
                            <h2 className="font-semibold text-[var(--color-font)] text-sm">Sesiones Activas</h2>
                            <span className="text-xs bg-[var(--color-primary)] text-[var(--color-quinary)] font-semibold px-2 py-0.5 rounded-full">
                                {activeSessions.length} en clase
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[var(--color-primary)]/15">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                            Estudiante
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                            Cedula
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                            Entrada
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--color-tertiary)]/15">
                                    {activeSessions.map((session) => {
                                        const student = getStudent(session.attendanceSessionStudentId);
                                        return (
                                            <tr
                                                key={session.attendanceSessionId}
                                                className="hover:bg-[var(--color-primary)]/10 transition-colors"
                                            >
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full bg-[var(--color-quinary)] flex items-center justify-center flex-shrink-0">
                                                            <span className="text-white text-xs font-bold">
                                                                {student?.studentFullName.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-[var(--color-font)]">
                                                            {student?.studentFullName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-[var(--color-font)]/60 font-mono text-xs">
                                                    {student?.studentIdentificationCard}
                                                </td>
                                                <td className="px-5 py-3 font-semibold text-[var(--color-quinary)]">
                                                    {session.attendanceSessionEntryTime}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <SessionStatusBadge status={session.attendanceSessionStatus} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {activeSessions.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-5 py-8 text-center text-[var(--color-font)]/40 text-sm"
                                            >
                                                No hay sesiones activas en este momento
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Approvals Table */}
                    <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-[var(--color-font)] text-sm">
                                    Cola de Salidas Pendientes
                                </h2>
                                <p className="text-xs text-[var(--color-font)]/50 mt-0.5">
                                    Solicitudes de salida que requieren aprobacion manual
                                </p>
                            </div>
                            {pendingApprovals.length > 0 && (
                                <button
                                    onClick={handleApproveAll}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-all"
                                    style={{ background: "var(--color-quinary)" }}
                                >
                                    <CheckCheck className="w-3.5 h-3.5" />
                                    Aprobar Todos
                                </button>
                            )}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#fde8dc]">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-sextary)] uppercase tracking-wide">
                                            Estudiante
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-sextary)] uppercase tracking-wide">
                                            Entrada
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-sextary)] uppercase tracking-wide">
                                            Estado
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-sextary)] uppercase tracking-wide">
                                            Accion
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--color-tertiary)]/15">
                                    {pendingApprovals.map((session) => {
                                        const student = getStudent(session.attendanceSessionStudentId);
                                        return (
                                            <tr
                                                key={session.attendanceSessionId}
                                                className="hover:bg-[#fde8dc]/40 transition-colors"
                                            >
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full bg-[var(--color-sextary)] flex items-center justify-center flex-shrink-0">
                                                            <span className="text-white text-xs font-bold">
                                                                {student?.studentFullName.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-[var(--color-font)]">
                                                            {student?.studentFullName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 font-semibold text-[var(--color-font)]">
                                                    {session.attendanceSessionEntryTime}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <SessionStatusBadge status={session.attendanceSessionStatus} />
                                                </td>
                                                <td className="px-5 py-3">
                                                    <button
                                                        onClick={() => handleApproveOne(session.attendanceSessionId)}
                                                        className="px-3 py-1.5 bg-[var(--color-primary)] text-[var(--color-quinary)] text-xs font-semibold rounded-lg hover:bg-[var(--color-septenary)] hover:text-white transition-all"
                                                    >
                                                        Aprobar
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {pendingApprovals.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-5 py-8 text-center text-[var(--color-font)]/40 text-sm"
                                            >
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
