'use client';

import { useState } from 'react';
import { Globe, CreditCard, Phone, Mail, ChevronDown, BookOpen, Clock, DollarSign } from 'lucide-react';
import { mockStudents, mockSessions } from '@/lib/classtrack-mock-data';
import { Student, SessionStatus } from '@/lib/classtrack-types';
import { ContractStatusBadge, ProgressCategoryBadge, SessionStatusBadge } from './shared/Badges';

type ProfileTab = 'academic' | 'attendance' | 'financial';

export function StudentProfileView() {
    const [selectedStudentId, setSelectedStudentId] = useState<string>(mockStudents[0].studentId);
    const [activeTab, setActiveTab] = useState<ProfileTab>('academic');

    const student = mockStudents.find((s) => s.studentId === selectedStudentId) as Student;
    const studentSessions = mockSessions.filter(
        (s) => s.attendanceSessionStudentId === selectedStudentId
    );

    const approvedSessions = studentSessions.filter(
        (s) => s.attendanceSessionStatus === SessionStatus.APPROVED
    );
    const totalMinutes = approvedSessions.reduce(
        (acc, s) => acc + (s.attendanceSessionTotalMinutes || 0),
        0
    );

    const tabs: { key: ProfileTab; label: string; icon: React.ReactNode }[] = [
        { key: 'academic', label: 'Academico', icon: <BookOpen className="w-4 h-4" /> },
        { key: 'attendance', label: 'Asistencia', icon: <Clock className="w-4 h-4" /> },
        { key: 'financial', label: 'Financiero', icon: <DollarSign className="w-4 h-4" /> }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Page Header with Student Selector */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-font)]">Perfil 360 del Estudiante</h1>
                    <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Vista completa del expediente academico</p>
                </div>
                <div className="relative">
                    <select
                        value={selectedStudentId}
                        onChange={(e) => {
                            setSelectedStudentId(e.target.value);
                            setActiveTab('academic');
                        }}
                        className="appearance-none pl-4 pr-10 py-2.5 border border-[var(--color-tertiary)]/40 rounded-xl text-[var(--color-font)] text-sm font-medium focus:outline-none focus:border-[var(--color-quinary)] transition-colors bg-white cursor-pointer"
                    >
                        {mockStudents.map((s) => (
                            <option key={s.studentId} value={s.studentId}>
                                {s.studentFullName}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-font)]/40 pointer-events-none" />
                </div>
            </div>

            {/* Profile Header Card */}
            <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                <div className="h-20 bg-[var(--color-quinary)]" />
                <div className="px-6 pb-6">
                    <div className="flex items-end gap-4 -mt-8 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-font-title)] border-4 border-white flex items-center justify-center flex-shrink-0 shadow-md">
                            <span className="text-white text-2xl font-bold">
                                {student.studentFullName.charAt(0)}
                            </span>
                        </div>
                        <div className="mb-1">
                            <h2 className="text-xl font-bold text-[var(--color-font)] leading-tight">{student.studentFullName}</h2>
                            <div className="flex items-center gap-1.5 mt-1">
                                <CreditCard className="w-3.5 h-3.5 text-[var(--color-font)]/40" />
                                <span className="text-sm text-[var(--color-font)]/60 font-mono">{student.studentIdentificationCard}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                            <Globe className="w-4 h-4 text-[var(--color-quinary)] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-[var(--color-font)]/40 uppercase tracking-wide font-semibold">Nacionalidad</p>
                                <p className="text-sm font-medium text-[var(--color-font)]">{student.studentNationality}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-[var(--color-quinary)] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-[var(--color-font)]/40 uppercase tracking-wide font-semibold">Certificado</p>
                                <p className="text-sm font-medium text-[var(--color-font)]">{student.studentCertificateType}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone className="w-4 h-4 text-[var(--color-quinary)] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-[var(--color-font)]/40 uppercase tracking-wide font-semibold">Telefono</p>
                                <p className="text-sm font-medium text-[var(--color-font)]">{student.studentPhoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-[var(--color-quinary)] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-[var(--color-font)]/40 uppercase tracking-wide font-semibold">Correo</p>
                                <p className="text-sm font-medium text-[var(--color-font)] truncate">{student.studentEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap">
                        <ContractStatusBadge status={student.studentContractStatus} />
                        <ProgressCategoryBadge category={student.studentProgressCategory} />
                        {student.studentIsGraduated && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-tertiary)] text-[var(--color-font)]">
                                Graduado
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                <div className="flex border-b border-[var(--color-tertiary)]/20">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                                activeTab === tab.key
                                    ? 'border-[var(--color-quinary)] text-[var(--color-quinary)] bg-[var(--color-primary)]/10'
                                    : 'border-transparent text-[var(--color-font)]/60 hover:text-[var(--color-font)] hover:bg-gray-50'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Academic Tab */}
                {activeTab === 'academic' && (
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[var(--color-primary)]/15 rounded-xl p-4 text-center">
                                <p className="text-3xl font-bold text-[var(--color-quinary)]">{approvedSessions.length}</p>
                                <p className="text-xs text-[var(--color-font)]/60 mt-1">Sesiones Completadas</p>
                            </div>
                            <div className="bg-[var(--color-primary)]/15 rounded-xl p-4 text-center">
                                <p className="text-3xl font-bold text-[var(--color-quinary)]">{Math.round(totalMinutes / 60)}</p>
                                <p className="text-xs text-[var(--color-font)]/60 mt-1">Horas Totales</p>
                            </div>
                            <div className="bg-[var(--color-primary)]/15 rounded-xl p-4 text-center">
                                <p className="text-3xl font-bold text-[var(--color-font-title)]">
                                    {approvedSessions.length > 0
                                        ? Math.round(totalMinutes / approvedSessions.length)
                                        : 0}
                                </p>
                                <p className="text-xs text-[var(--color-font)]/60 mt-1">Minutos Promedio/Sesion</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[var(--color-font)] text-sm mb-3">Progreso Academico</h3>
                            <div className="p-4 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-[var(--color-font)]">{student.studentCertificateType}</p>
                                    <p className="text-xs text-[var(--color-font)]/50 mt-1">
                                        Inicio: {student.studentStartDate.toLocaleDateString('es-VE')}
                                    </p>
                                </div>
                                <ProgressCategoryBadge category={student.studentProgressCategory} />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[var(--color-font)] text-sm mb-3">Modulos Asignados</h3>
                            <div className="space-y-2">
                                {['Modulo 1: Fundamentos', 'Modulo 2: Vocabulario', 'Modulo 3: Gramatica Avanzada'].map((module, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-[var(--color-tertiary)]/30 rounded-lg">
                                        <span className="text-sm text-[var(--color-font)]">{module}</span>
                                        <span className={`text-xs font-semibold ${
                                            i === 0 ? 'text-[var(--color-quinary)]' :
                                            i === 1 ? 'text-[var(--color-font-title)]' :
                                            'text-[var(--color-font)]/40'
                                        }`}>
                                            {i === 0 ? 'Completado' : i === 1 ? 'En Progreso' : 'Pendiente'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Attendance Tab */}
                {activeTab === 'attendance' && (
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[var(--color-primary)]/15">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">Fecha</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">Entrada</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">Salida</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">Duracion</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-quinary)] uppercase tracking-wide">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--color-tertiary)]/15">
                                    {studentSessions.length > 0 ? studentSessions.map((session) => (
                                        <tr key={session.attendanceSessionId} className="hover:bg-[var(--color-primary)]/10 transition-colors">
                                            <td className="px-5 py-3 font-medium text-[var(--color-font)]">
                                                {session.attendanceSessionDate.toLocaleDateString('es-VE')}
                                            </td>
                                            <td className="px-5 py-3 text-[var(--color-font)]/70 font-mono">{session.attendanceSessionEntryTime}</td>
                                            <td className="px-5 py-3 text-[var(--color-font)]/70 font-mono">
                                                {session.attendanceSessionExitTime || '—'}
                                            </td>
                                            <td className="px-5 py-3 text-[var(--color-font)]/70">
                                                {session.attendanceSessionTotalMinutes
                                                    ? `${session.attendanceSessionTotalMinutes} min`
                                                    : '—'}
                                            </td>
                                            <td className="px-5 py-3">
                                                <SessionStatusBadge status={session.attendanceSessionStatus} />
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-8 text-center text-[var(--color-font)]/40 text-sm">
                                                No hay registros de asistencia disponibles
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {studentSessions.length === 0 && (
                            <p className="text-center text-[var(--color-font)]/40 text-sm py-4">
                                Este estudiante no tiene sesiones de asistencia registradas aun
                            </p>
                        )}
                    </div>
                )}

                {/* Financial Tab */}
                {activeTab === 'financial' && (
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-[var(--color-tertiary)]/30 rounded-xl p-4">
                                <p className="text-xs text-[var(--color-font)]/50 uppercase tracking-wide font-semibold mb-1">Plan de Pago</p>
                                <p className="font-semibold text-[var(--color-font)]">Mensual</p>
                                <p className="text-xs text-[var(--color-font)]/40 mt-1">Activo desde {student.studentStartDate.toLocaleDateString('es-VE')}</p>
                            </div>
                            <div className="border border-[var(--color-tertiary)]/30 rounded-xl p-4">
                                <p className="text-xs text-[var(--color-font)]/50 uppercase tracking-wide font-semibold mb-1">Proximo Pago</p>
                                <p className="font-semibold text-[var(--color-font)]">01/04/2025</p>
                                <p className="text-xs text-[var(--color-font-title)] mt-1 font-medium">Bs. 2,500.00</p>
                            </div>
                            <div className="border border-[var(--color-tertiary)]/30 rounded-xl p-4">
                                <p className="text-xs text-[var(--color-font)]/50 uppercase tracking-wide font-semibold mb-1">Estado</p>
                                <p className="font-semibold text-[var(--color-quinary)]">Al Dia</p>
                                <p className="text-xs text-[var(--color-font)]/40 mt-1">Sin pagos pendientes</p>
                            </div>
                        </div>

                        <div className="border border-[var(--color-tertiary)]/30 rounded-xl overflow-hidden">
                            <div className="px-5 py-3 bg-[var(--color-primary)]/10 border-b border-[var(--color-tertiary)]/20">
                                <h3 className="font-semibold text-[var(--color-font)] text-sm">Historial de Pagos</h3>
                            </div>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-font)]/60 uppercase tracking-wide">Fecha</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-font)]/60 uppercase tracking-wide">Concepto</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-font)]/60 uppercase tracking-wide">Monto</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-font)]/60 uppercase tracking-wide">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--color-tertiary)]/15">
                                    {[
                                        { date: '01/03/2025', concept: 'Mensualidad Marzo', amount: 'Bs. 2,500.00', paid: true },
                                        { date: '01/02/2025', concept: 'Mensualidad Febrero', amount: 'Bs. 2,500.00', paid: true },
                                        { date: '01/01/2025', concept: 'Inscripcion + Enero', amount: 'Bs. 4,500.00', paid: true }
                                    ].map((payment, i) => (
                                        <tr key={i} className="hover:bg-[var(--color-primary)]/10 transition-colors">
                                            <td className="px-5 py-3 text-[var(--color-font)]/70">{payment.date}</td>
                                            <td className="px-5 py-3 text-[var(--color-font)]">{payment.concept}</td>
                                            <td className="px-5 py-3 font-semibold text-[var(--color-font)]">{payment.amount}</td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-quinary)]">
                                                    Pagado
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
