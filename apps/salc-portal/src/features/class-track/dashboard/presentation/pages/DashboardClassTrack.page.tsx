import { Users, Clock, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";

import { useGetDashboardSummary } from "@/features/class-track/dashboard/application/hooks/use-cases/useGetDashboardSummary.use";
import { ContractStatusBadge } from "@/core/components/class-track/shared/Badges";

interface StatCardProps {
    readonly label: string;
    readonly value: number;
    readonly icon: React.ReactNode;
    readonly color: string;
    readonly lightColor: string;
}

function StatCard({ label, value, icon, color, lightColor }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 p-5">
            <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: lightColor }}>
                    <span style={{ color }}>{icon}</span>
                </div>
            </div>
            <p className="text-3xl font-bold" style={{ color }}>
                {value}
            </p>
            <p className="text-xs text-[var(--color-font)]/50 mt-1 leading-relaxed">{label}</p>
        </div>
    );
}

export default function ComponentName() {
    const { data, isLoading, isError } = useGetDashboardSummary();
    /*
TODO: Construir en la version 2.0 del MVP, no es prioridad
    const atRiskStudents = mockStudents.filter(
        (s) =>
            s.studentProgressCategory === ProgressCategory.SLOW ||
            s.studentProgressCategory === ProgressCategory.NOT_ENOUGH_DATA,
    );
    */

    if (isLoading) return <div className="p-6 space-y-6">Loading...</div>;

    if (isError) return <div className="p-6 space-y-6">Error</div>;

    if (data)
        return (
            <div className="p-6 space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-font)]">Resumen General</h1>
                    <p className="text-[var(--color-font)]/50 text-sm mt-0.5">
                        {new Date().toLocaleDateString("es-VE", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Estudiantes Adentro"
                        value={data.studentsInsideCount}
                        icon={<Users className="w-5 h-5" />}
                        color="var(--color-quinary)"
                        lightColor="var(--color-primary)"
                    />
                    <StatCard
                        label="Salidas Pendientes"
                        value={data.pendingCheckoutsCount}
                        icon={<Clock className="w-5 h-5" />}
                        color="var(--color-sextary)"
                        lightColor="#fde8dc"
                    />
                    <StatCard
                        label="Alertas Activas"
                        value={data.activeAlertsCount}
                        icon={<AlertTriangle className="w-5 h-5" />}
                        color="var(--color-quaternary)"
                        lightColor="#f5e0d4"
                    />
                    <StatCard
                        label="Contratos Activos"
                        value={data.activeContractsCount}
                        icon={<CheckCircle className="w-5 h-5" />}
                        color="var(--color-septenary)"
                        lightColor="var(--color-primary)"
                    />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Students Currently Inside */}
                    <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[var(--color-quinary)]" />
                                <h2 className="font-semibold text-[var(--color-font)] text-sm">Actualmente en Clase</h2>
                            </div>
                            <span className="text-xs bg-[var(--color-primary)] text-[var(--color-quinary)] font-semibold px-2 py-0.5 rounded-full">
                                {data.studentsInsideCount} activos
                            </span>
                        </div>
                        <div className="divide-y divide-[var(--color-tertiary)]/15">
                            {data.studentsInClass.map(({ sessionId, fullName, contractStatus, entryTime }) => (
                                <div key={sessionId} className="px-5 py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[var(--color-quinary)] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">{fullName.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[var(--color-font)]">{fullName}</p>
                                            <p className="text-xs text-[var(--color-font)]/50">{contractStatus}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-[var(--color-quinary)]">
                                            Desde {entryTime.toString()}
                                        </p>
                                        <span className="text-[10px] text-[var(--color-font)]/40">Hoy</span>
                                    </div>
                                </div>
                            ))}
                            {data.studentsInClass.length === 0 && (
                                <div className="px-5 py-8 text-center text-[var(--color-font)]/40 text-sm">
                                    Ningun estudiante en clase actualmente
                                </div>
                            )}
                        </div>
                    </div>

                    {/* At Risk Students  * TODO: Construir en la version 2.0 del MVP, no es prioridad*/}
                    {/*
                <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[var(--color-sextary)]" />
                            <h2 className="font-semibold text-[var(--color-font)] text-sm">Estudiantes en Riesgo</h2>
                        </div>
                        <span className="text-xs bg-[#fde8dc] text-[var(--color-sextary)] font-semibold px-2 py-0.5 rounded-full">
                            {atRiskStudents.length} identificados
                        </span>
                    </div>
<div className="divide-y divide-[var(--color-tertiary)]/15">
                        {atRiskStudents.map((student) => (
                            <div key={student.studentId} className="px-5 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-tertiary)] flex items-center justify-center flex-shrink-0">
                                        <span className="text-[var(--color-font)] text-xs font-bold">
                                            {student.studentFullName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--color-font)]">
                                            {student.studentFullName}
                                        </p>
                                        <p className="text-xs text-[var(--color-font)]/50">
                                            {student.studentCertificateType}
                                        </p>
                                    </div>
                                </div>
                                <ProgressCategoryBadge category={student.studentProgressCategory} />
                            </div>
                        ))}
                    </div><div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[var(--color-sextary)]" />
                            <h2 className="font-semibold text-[var(--color-font)] text-sm">Estudiantes en Riesgo</h2>
                        </div>
                        <span className="text-xs bg-[#fde8dc] text-[var(--color-sextary)] font-semibold px-2 py-0.5 rounded-full">
                            {atRiskStudents.length} identificados
                        </span>
                    </div>
<div className="divide-y divide-[var(--color-tertiary)]/15">
                        {atRiskStudents.map((student) => (
                            <div key={student.studentId} className="px-5 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-tertiary)] flex items-center justify-center flex-shrink-0">
                                        <span className="text-[var(--color-font)] text-xs font-bold">
                                            {student.studentFullName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--color-font)]">
                                            {student.studentFullName}
                                        </p>
                                        <p className="text-xs text-[var(--color-font)]/50">
                                            {student.studentCertificateType}
                                        </p>
                                    </div>
                                </div>
                                <ProgressCategoryBadge category={student.studentProgressCategory} />
                            </div>
                        ))}
                    </div>
                     </div>
                */}
                </div>

                {/* All Students Table */}
                <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                    <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[var(--color-font-title)]" />
                        <h2 className="font-semibold text-[var(--color-font)] text-sm">Directorio de Estudiantes</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[var(--color-primary)]/20">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Estudiante
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Identificador
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Contrato
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">
                                        Ingreso
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-tertiary)]/15">
                                {data.studentsInClass.map((student) => (
                                    <tr key={student.sessionId} className="hover:bg-[var(--color-primary)]/10 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-full bg-[var(--color-quinary)] flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white text-xs font-bold">
                                                        {student.fullName.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="font-medium text-[var(--color-font)]">{student.fullName}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-[var(--color-font)]">{student.studentId}</td>
                                        <td className="px-5 py-3">
                                            <ContractStatusBadge status={student.contractStatus} />
                                        </td>
                                        <td className="px-5 py-3 text-[var(--color-font)]">
                                            {student.entryTime.toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
}
