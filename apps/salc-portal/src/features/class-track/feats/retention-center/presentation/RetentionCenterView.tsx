"use client";

import { useState } from "react";
import { AlertTriangle, X, Calendar, Phone, MessageSquare } from "lucide-react";
import { mockStudents, mockAlerts } from "@/lib/classtrack-mock-data";
import { RetentionAlert, AlertStatus } from "@/lib/classtrack-types";
import { ContractStatusBadge, AlertStatusBadge } from "./shared/Badges";

export function RetentionCenterView() {
    const [alerts, setAlerts] = useState(mockAlerts);
    const [selectedAlert, setSelectedAlert] = useState<RetentionAlert | null>(null);
    const [editForm, setEditForm] = useState({
        contactDate: "",
        hasResponded: false,
        isJustified: false,
        justificationReason: "",
        returnDeadline: "",
    });

    const getStudent = (studentId: string) => {
        return mockStudents.find((s) => s.studentId === studentId);
    };

    const handleRowClick = (alert: RetentionAlert) => {
        setSelectedAlert(alert);
        setEditForm({
            contactDate: alert.retentionAlertContactDate ? alert.retentionAlertContactDate.toISOString().split("T")[0] : "",
            hasResponded: alert.retentionAlertHasResponded,
            isJustified: alert.retentionAlertIsJustified,
            justificationReason: alert.retentionAlertJustificationReason || "",
            returnDeadline: alert.retentionAlertReturnDeadline
                ? alert.retentionAlertReturnDeadline.toISOString().split("T")[0]
                : "",
        });
    };

    const handleSave = () => {
        if (!selectedAlert) return;
        setAlerts((prev) =>
            prev.map((a) =>
                a.retentionAlertId === selectedAlert.retentionAlertId
                    ? {
                          ...a,
                          retentionAlertContactDate: editForm.contactDate ? new Date(editForm.contactDate) : null,
                          retentionAlertHasResponded: editForm.hasResponded,
                          retentionAlertIsJustified: editForm.isJustified,
                          retentionAlertJustificationReason: editForm.justificationReason || null,
                          retentionAlertReturnDeadline: editForm.returnDeadline ? new Date(editForm.returnDeadline) : null,
                          retentionAlertStatus: editForm.hasResponded ? AlertStatus.RESOLVED : a.retentionAlertStatus,
                      }
                    : a,
            ),
        );
        setSelectedAlert(null);
    };

    const pendingAlerts = alerts.filter((a) => a.retentionAlertStatus === AlertStatus.PENDING);
    const resolvedAlerts = alerts.filter((a) => a.retentionAlertStatus !== AlertStatus.PENDING);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-font)]">Centro de Retencion</h1>
                    <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Seguimiento de estudiantes en riesgo de abandono</p>
                </div>
                <div className="flex gap-3">
                    <div className="text-center bg-white rounded-xl border border-[var(--color-tertiary)]/30 px-4 py-3">
                        <p className="text-2xl font-bold text-[var(--color-quaternary)]">{pendingAlerts.length}</p>
                        <p className="text-xs text-[var(--color-font)]/50">Pendientes</p>
                    </div>
                    <div className="text-center bg-white rounded-xl border border-[var(--color-tertiary)]/30 px-4 py-3">
                        <p className="text-2xl font-bold text-[var(--color-quinary)]">{resolvedAlerts.length}</p>
                        <p className="text-xs text-[var(--color-font)]/50">Resueltos</p>
                    </div>
                </div>
            </div>

            {/* Pending Alerts */}
            <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[var(--color-quaternary)]" />
                    <h2 className="font-semibold text-[var(--color-font)] text-sm">Alertas Activas</h2>
                    <span className="ml-auto text-xs bg-[#f5e0d4] text-[var(--color-quaternary)] font-semibold px-2 py-0.5 rounded-full">
                        {pendingAlerts.length} alertas
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#f5e0d4]/50">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quaternary)] uppercase tracking-wide">
                                    Estudiante
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quaternary)] uppercase tracking-wide">
                                    Contrato
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quaternary)] uppercase tracking-wide">
                                    Dias Ausente
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quaternary)] uppercase tracking-wide">
                                    Contacto
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quaternary)] uppercase tracking-wide">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-tertiary)]/15">
                            {pendingAlerts.map((alert) => {
                                const student = getStudent(alert.retentionAlertStudentId);

                                return (
                                    <tr
                                        key={alert.retentionAlertId}
                                        onClick={() => handleRowClick(alert)}
                                        className="hover:bg-[#f5e0d4]/30 transition-colors cursor-pointer"
                                    >
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white text-xs font-bold">
                                                        {student?.studentFullName.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[var(--color-font)]">
                                                        {student?.studentFullName}
                                                    </p>
                                                    <p className="text-xs text-[var(--color-font)]/50">
                                                        {student?.studentPhoneNumber}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            {student && <ContractStatusBadge status={student.studentContractStatus} />}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`font-bold text-lg ${alert.retentionAlertDaysAbsent >= 14 ? "text-[var(--color-quaternary)]" : "text-[var(--color-sextary)]"}`}
                                            >
                                                {alert.retentionAlertDaysAbsent}
                                            </span>
                                            <span className="text-[var(--color-font)]/50 text-xs ml-1">dias</span>
                                        </td>
                                        <td className="px-5 py-3">
                                            {alert.retentionAlertContactDate ? (
                                                <span className="text-[var(--color-font)] text-xs">
                                                    {alert.retentionAlertContactDate.toLocaleDateString("es-VE")}
                                                </span>
                                            ) : (
                                                <span className="text-[var(--color-font)]/40 text-xs italic">Sin contacto</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3">
                                            <AlertStatusBadge alertStatus={alert.retentionAlertStatus} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-[var(--color-font)]/40 text-xs py-2 bg-[var(--color-primary)]/5">
                    Haz clic en una fila para gestionar la alerta
                </p>
            </div>

            {/* Resolved Alerts */}
            {resolvedAlerts.length > 0 && (
                <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                    <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center gap-2">
                        <h2 className="font-semibold text-[var(--color-font)] text-sm">Historial de Alertas</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[var(--color-primary)]/10">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Estudiante
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Dias Ausente
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Justificado
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Razon
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-tertiary)]/15">
                                {resolvedAlerts.map((alert) => {
                                    const student = getStudent(alert.retentionAlertStudentId);

                                    return (
                                        <tr key={alert.retentionAlertId} className="opacity-70">
                                            <td className="px-5 py-3 font-medium text-[var(--color-font)]">
                                                {student?.studentFullName}
                                            </td>
                                            <td className="px-5 py-3 text-[var(--color-font)]/70">
                                                {alert.retentionAlertDaysAbsent} dias
                                            </td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`text-xs font-semibold ${alert.retentionAlertIsJustified ? "text-[var(--color-quinary)]" : "text-[var(--color-quaternary)]"}`}
                                                >
                                                    {alert.retentionAlertIsJustified ? "Si" : "No"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-[var(--color-font)]/60 text-xs italic">
                                                {alert.retentionAlertJustificationReason || "—"}
                                            </td>
                                            <td className="px-5 py-3">
                                                <AlertStatusBadge alertStatus={alert.retentionAlertStatus} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal / Slide-over */}
            {selectedAlert &&
                (() => {
                    const student = getStudent(selectedAlert.retentionAlertStudentId);

                    return (
                        <div className="fixed inset-0 z-50 flex">
                            <div className="flex-1 bg-black/30" onClick={() => setSelectedAlert(null)} />
                            <div className="w-full max-w-md bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
                                {/* Header */}
                                <div className="px-6 py-5 border-b border-[var(--color-tertiary)]/20 flex items-center justify-between sticky top-0 bg-white">
                                    <div>
                                        <h3 className="font-bold text-[var(--color-font)]">Gestionar Alerta</h3>
                                        <p className="text-xs text-[var(--color-font)]/50 mt-0.5">{student?.studentFullName}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedAlert(null)}
                                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-4 h-4 text-[var(--color-font)]/50" />
                                    </button>
                                </div>

                                {/* Student Info */}
                                <div className="px-6 py-4 bg-[var(--color-primary)]/15">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-[var(--color-quinary)] flex items-center justify-center">
                                            <span className="text-white font-bold">{student?.studentFullName.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[var(--color-font)]">{student?.studentFullName}</p>
                                            <p className="text-xs text-[var(--color-font)]/60">
                                                {student?.studentIdentificationCard}
                                            </p>
                                            <p className="text-xs text-[var(--color-font)]/60 flex items-center gap-1 mt-0.5">
                                                <Phone className="w-3 h-3" /> {student?.studentPhoneNumber}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 p-3 bg-white/60 rounded-lg">
                                        <p className="text-sm font-semibold text-[var(--color-quaternary)]">
                                            {selectedAlert.retentionAlertDaysAbsent} dias de ausencia
                                        </p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="flex-1 px-6 py-5 space-y-5">
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-font)] mb-1.5 uppercase tracking-wide">
                                            <Calendar className="w-3.5 h-3.5" /> Fecha de Contacto
                                        </label>
                                        <input
                                            type="date"
                                            value={editForm.contactDate}
                                            onChange={(e) => setEditForm({ ...editForm, contactDate: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-[var(--color-tertiary)]/40 rounded-lg text-[var(--color-font)] text-sm focus:outline-none focus:border-[var(--color-quinary)] transition-colors"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-[var(--color-primary)]/10 rounded-lg">
                                        <label className="text-sm font-medium text-[var(--color-font)]">
                                            Respondio al contacto
                                        </label>
                                        <button
                                            onClick={() => setEditForm({ ...editForm, hasResponded: !editForm.hasResponded })}
                                            className={`w-11 h-6 rounded-full transition-all relative ${editForm.hasResponded ? "bg-[var(--color-quinary)]" : "bg-gray-300"}`}
                                        >
                                            <span
                                                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${editForm.hasResponded ? "left-5" : "left-0.5"}`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-[var(--color-primary)]/10 rounded-lg">
                                        <label className="text-sm font-medium text-[var(--color-font)]">
                                            Ausencia justificada
                                        </label>
                                        <button
                                            onClick={() => setEditForm({ ...editForm, isJustified: !editForm.isJustified })}
                                            className={`w-11 h-6 rounded-full transition-all relative ${editForm.isJustified ? "bg-[var(--color-quinary)]" : "bg-gray-300"}`}
                                        >
                                            <span
                                                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${editForm.isJustified ? "left-5" : "left-0.5"}`}
                                            />
                                        </button>
                                    </div>

                                    {editForm.isJustified && (
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-font)] mb-1.5 uppercase tracking-wide">
                                                <MessageSquare className="w-3.5 h-3.5" /> Razon de Justificacion
                                            </label>
                                            <textarea
                                                value={editForm.justificationReason}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, justificationReason: e.target.value })
                                                }
                                                placeholder="Describe la razon de la ausencia..."
                                                rows={3}
                                                className="w-full px-3 py-2.5 border border-[var(--color-tertiary)]/40 rounded-lg text-[var(--color-font)] text-sm focus:outline-none focus:border-[var(--color-quinary)] transition-colors resize-none"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-font)] mb-1.5 uppercase tracking-wide">
                                            <Calendar className="w-3.5 h-3.5" /> Fecha Limite de Regreso
                                        </label>
                                        <input
                                            type="date"
                                            value={editForm.returnDeadline}
                                            onChange={(e) => setEditForm({ ...editForm, returnDeadline: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-[var(--color-tertiary)]/40 rounded-lg text-[var(--color-font)] text-sm focus:outline-none focus:border-[var(--color-quinary)] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-4 border-t border-[var(--color-tertiary)]/20 flex gap-3">
                                    <button
                                        onClick={() => setSelectedAlert(null)}
                                        className="flex-1 py-2.5 border border-[var(--color-tertiary)]/40 rounded-lg text-sm font-semibold text-[var(--color-font)] hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                                        style={{ background: "var(--color-quinary)" }}
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()}
        </div>
    );
}
