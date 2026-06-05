import { Globe, CreditCard, Phone, Mail, BookOpen, Clock, DollarSign, ArrowLeft, Pencil } from "lucide-react";

import { useState } from "react";
import { ContractStatusBadge, ProgressCategoryBadge } from "@/core/components/admin-desk/badges/Badges";
import { Button } from "@/core/components/admin-desk/buttons/button";
import { useNavigate } from "react-router-dom";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";

type ProfileTab = "academic" | "attendance" | "financial";

interface StudentProfileViewDataProps {
    student: StudentEntity;
    handleSetEdit: () => void;
}

export default function StudentProfileData({ student, handleSetEdit }: StudentProfileViewDataProps) {
    //TODO: Implementar el cambio del estado del contrato
    //TODO: Implementar marcar como graduado

    const [activeTab, setActiveTab] = useState<ProfileTab>("academic");
    const navigation = useNavigate();

    const handleBack = () => navigation("/view-students");

    const tabs: { key: ProfileTab; label: string; icon: React.ReactNode }[] = [
        { key: "academic", label: "Academico", icon: <BookOpen className="w-4 h-4" /> },
        { key: "attendance", label: "Asistencia", icon: <Clock className="w-4 h-4" /> },
        { key: "financial", label: "Financiero", icon: <DollarSign className="w-4 h-4" /> },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-title">Perfil del Estudiante</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Vista completa del expediente academico</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Button>
                    <Button onClick={handleSetEdit}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
                <div className="h-20 bg-primary-foreground" />
                <div className="px-6 pb-6">
                    <div className="flex items-end gap-4 -mt-8 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-accent border-4 border-card flex items-center justify-center flex-shrink-0 shadow-md">
                            <span className="text-accent-foreground text-2xl font-bold">
                                {student.fullName.charAt(0)}
                            </span>
                        </div>
                        <div className="mb-1">
                            <h2 className="text-xl font-bold text-foreground leading-tight">{student.fullName}</h2>
                            <div className="flex items-center gap-1.5 mt-1">
                                <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground font-mono">
                                    {student.identificationCard}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                            <Globe className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                                    Nacionalidad
                                </p>
                                {/* Asumiendo que agregaste nationality a tu entity, si no, reemplázalo con otra prop */}
                                <p className="text-sm font-medium text-foreground">
                                    {student.nationality || "Ecuatoriana"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                                    Certificado
                                </p>
                                <p className="text-sm font-medium text-foreground">{student.certificateType}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                                    Telefono
                                </p>
                                <p className="text-sm font-medium text-foreground">{student.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                                    Correo
                                </p>
                                <p className="text-sm font-medium text-foreground truncate">{student.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap">
                        <ContractStatusBadge status={student.contractStatus} />
                        <ProgressCategoryBadge category={student.progressCategory} />
                        {student.isGraduated && (
                            // bg-secondary es el equivalente perfecto a tu color tertiary (Tan)
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                                Graduado
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Tabs Container --- */}
            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
                <div className="flex border-b border-border/50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex cursor-pointer items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                                activeTab === tab.key
                                    ? "border-primary-foreground text-primary-foreground bg-primary/10"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* =========================================
                    TODO: ACADEMIC TAB (Ya migrado visualmente) 
                    ========================================= */}
                {/* {activeTab === 'academic' && (
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-primary/15 rounded-xl p-4 text-center">
                                <p className="text-3xl font-bold text-primary-foreground">{approvedSessions.length}</p>
                                <p className="text-xs text-muted-foreground mt-1">Sesiones Completadas</p>
                            </div>
                            <div className="bg-primary/15 rounded-xl p-4 text-center">
                                <p className="text-3xl font-bold text-primary-foreground">{Math.round(totalMinutes / 60)}</p>
                                <p className="text-xs text-muted-foreground mt-1">Horas Totales</p>
                            </div>
                            <div className="bg-primary/15 rounded-xl p-4 text-center">
                                <p className="text-3xl font-bold text-title">
                                    {approvedSessions.length > 0
                                        ? Math.round(totalMinutes / approvedSessions.length)
                                        : 0}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">Minutos Promedio/Sesion</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-foreground text-sm mb-3">Progreso Academico</h3>
                            <div className="p-4 bg-primary/10 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">{student.certificateType}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Inicio: {student.startDate?.toLocaleDateString('es-VE')}
                                    </p>
                                </div>
                                <ProgressCategoryBadge category={student.progressCategory} />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-foreground text-sm mb-3">Modulos Asignados</h3>
                            <div className="space-y-2">
                                {['Modulo 1: Fundamentos', 'Modulo 2: Vocabulario', 'Modulo 3: Gramatica Avanzada'].map((module, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                                        <span className="text-sm text-foreground">{module}</span>
                                        <span className={`text-xs font-semibold ${
                                            i === 0 ? 'text-primary-foreground' :
                                            i === 1 ? 'text-title' :
                                            'text-muted-foreground'
                                        }`}>
                                            {i === 0 ? 'Completado' : i === 1 ? 'En Progreso' : 'Pendiente'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                */}

                {/* =========================================
                    TODO: ATTENDANCE TAB (Ya migrado visualmente) 
                    ========================================= */}
                {/* {activeTab === 'attendance' && (
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-primary/15">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Fecha</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Entrada</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Salida</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Duracion</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {studentSessions.length > 0 ? studentSessions.map((session) => (
                                        <tr key={session.attendanceSessionId} className="hover:bg-primary/10 transition-colors">
                                            <td className="px-5 py-3 font-medium text-foreground">
                                                {session.attendanceSessionDate.toLocaleDateString('es-VE')}
                                            </td>
                                            <td className="px-5 py-3 text-foreground/70 font-mono">{session.attendanceSessionEntryTime}</td>
                                            <td className="px-5 py-3 text-foreground/70 font-mono">
                                                {session.attendanceSessionExitTime || '—'}
                                            </td>
                                            <td className="px-5 py-3 text-foreground/70">
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
                                            <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-sm">
                                                No hay registros de asistencia disponibles
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {studentSessions.length === 0 && (
                            <p className="text-center text-muted-foreground text-sm py-4">
                                Este estudiante no tiene sesiones de asistencia registradas aun
                            </p>
                        )}
                    </div>
                )}
                */}

                {/* =========================================
                    TODO: FINANCIAL TAB (Ya migrado visualmente) 
                    ========================================= */}
                {/* {activeTab === 'financial' && (
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-border/50 rounded-xl p-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Plan de Pago</p>
                                <p className="font-semibold text-foreground">Mensual</p>
                                <p className="text-xs text-muted-foreground mt-1">Activo desde {student.startDate?.toLocaleDateString('es-VE')}</p>
                            </div>
                            <div className="border border-border/50 rounded-xl p-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Proximo Pago</p>
                                <p className="font-semibold text-foreground">01/04/2026</p>
                                <p className="text-xs text-title mt-1 font-medium">Bs. 2,500.00</p>
                            </div>
                            <div className="border border-border/50 rounded-xl p-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Estado</p>
                                <p className="font-semibold text-primary-foreground">Al Dia</p>
                                <p className="text-xs text-muted-foreground mt-1">Sin pagos pendientes</p>
                            </div>
                        </div>

                        <div className="border border-border/50 rounded-xl overflow-hidden">
                            <div className="px-5 py-3 bg-primary/10 border-b border-border/50">
                                <h3 className="font-semibold text-foreground text-sm">Historial de Pagos</h3>
                            </div>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-muted/30">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fecha</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Concepto</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Monto</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {[
                                        { date: '01/03/2026', concept: 'Mensualidad Marzo', amount: 'Bs. 2,500.00', paid: true },
                                        { date: '01/02/2026', concept: 'Mensualidad Febrero', amount: 'Bs. 2,500.00', paid: true },
                                        { date: '01/01/2026', concept: 'Inscripcion + Enero', amount: 'Bs. 4,500.00', paid: true }
                                    ].map((payment, i) => (
                                        <tr key={i} className="hover:bg-primary/10 transition-colors">
                                            <td className="px-5 py-3 text-foreground/70">{payment.date}</td>
                                            <td className="px-5 py-3 text-foreground">{payment.concept}</td>
                                            <td className="px-5 py-3 font-semibold text-foreground">{payment.amount}</td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
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
                */}
            </div>
        </div>
    );
}
