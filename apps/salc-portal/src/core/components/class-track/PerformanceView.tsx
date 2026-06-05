'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    Legend
} from 'recharts';
import { TrendingDown, AlertCircle } from 'lucide-react';
import { mockPerformanceData } from '@/lib/classtrack-mock-data';
import { ProgressCategory } from '@/lib/classtrack-types';
import { ProgressCategoryBadge } from './shared/Badges';

interface CustomTooltipProps {
    active?: boolean;
    payload?: { name: string; value: number; }[];
    label?: string;
}

function CustomBarTooltip({ active, payload, label }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-[var(--color-tertiary)]/30 rounded-xl shadow-lg p-3">
                <p className="font-semibold text-[var(--color-font)] text-sm mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs text-[var(--color-font)]/70">
                        {entry.name === 'totalMinutes' ? 'Minutos' : 'Lecciones'}: <span className="font-bold text-[var(--color-quinary)]">{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
}

function CustomScatterTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-[var(--color-tertiary)]/30 rounded-xl shadow-lg p-3">
                <p className="text-xs text-[var(--color-font)]/70">Minutos: <span className="font-bold text-[var(--color-quinary)]">{payload[0]?.value}</span></p>
                <p className="text-xs text-[var(--color-font)]/70">Lecciones: <span className="font-bold text-[var(--color-font-title)]">{payload[1]?.value}</span></p>
            </div>
        );
    }
    return null;
}

export function PerformanceView() {
    const interventionList = mockPerformanceData.filter(
        (d) =>
            d.progressCategory === ProgressCategory.SLOW ||
            d.progressCategory === ProgressCategory.NOT_ENOUGH_DATA
    );

    const scatterData = mockPerformanceData.map((d) => ({
        x: d.totalMinutes,
        y: d.lessonsAdvanced,
        name: d.studentName
    }));

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--color-font)]">Monitoreo de Rendimiento</h1>
                <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Analisis de progreso academico y asistencia</p>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart: Minutes per student */}
                <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 p-5">
                    <h2 className="font-semibold text-[var(--color-font)] text-sm mb-1">Minutos de Asistencia por Estudiante</h2>
                    <p className="text-xs text-[var(--color-font)]/50 mb-4">Tiempo total acumulado en clase</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={mockPerformanceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd2" />
                            <XAxis
                                dataKey="studentName"
                                tick={{ fontSize: 11, fill: '#685c46' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis tick={{ fontSize: 11, fill: '#685c46' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomBarTooltip />} />
                            <Bar
                                dataKey="totalMinutes"
                                name="totalMinutes"
                                fill="var(--color-quinary)"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart: Lessons advanced */}
                <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 p-5">
                    <h2 className="font-semibold text-[var(--color-font)] text-sm mb-1">Lecciones Avanzadas por Estudiante</h2>
                    <p className="text-xs text-[var(--color-font)]/50 mb-4">Total de lecciones completadas</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={mockPerformanceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd2" />
                            <XAxis
                                dataKey="studentName"
                                tick={{ fontSize: 11, fill: '#685c46' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis tick={{ fontSize: 11, fill: '#685c46' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomBarTooltip />} />
                            <Bar
                                dataKey="lessonsAdvanced"
                                name="lessonsAdvanced"
                                fill="var(--color-font-title)"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Scatter Plot */}
            <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 p-5">
                <h2 className="font-semibold text-[var(--color-font)] text-sm mb-1">Correlacion: Minutos vs Lecciones</h2>
                <p className="text-xs text-[var(--color-font)]/50 mb-4">Dispersion de datos de rendimiento individual</p>
                <ResponsiveContainer width="100%" height={240}>
                    <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd2" />
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="Minutos"
                            tick={{ fontSize: 11, fill: '#685c46' }}
                            axisLine={false}
                            tickLine={false}
                            label={{ value: 'Minutos Totales', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#685c46' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Lecciones"
                            tick={{ fontSize: 11, fill: '#685c46' }}
                            axisLine={false}
                            tickLine={false}
                            label={{ value: 'Lecciones', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#685c46' }}
                        />
                        <Tooltip content={<CustomScatterTooltip />} />
                        <Legend />
                        <Scatter name="Estudiantes" data={scatterData} fill="var(--color-quinary)" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            {/* Intervention List */}
            <div className="bg-white rounded-xl border border-[var(--color-tertiary)]/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--color-tertiary)]/20 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-[var(--color-sextary)]" />
                    <h2 className="font-semibold text-[var(--color-font)] text-sm">Lista para Intervencion Pedagogica</h2>
                    <span className="ml-auto text-xs bg-[#fde8dc] text-[var(--color-sextary)] font-semibold px-2 py-0.5 rounded-full">
                        {interventionList.length} estudiantes
                    </span>
                </div>
                <div className="divide-y divide-[var(--color-tertiary)]/15">
                    {interventionList.map((student, i) => (
                        <div key={i} className="px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-4 h-4 text-[var(--color-sextary)] flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-[var(--color-font)] text-sm">{student.studentName}</p>
                                    <p className="text-xs text-[var(--color-font)]/50 mt-0.5">
                                        {student.totalMinutes} min &middot; {student.lessonsAdvanced} lecc. avanzadas
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ProgressCategoryBadge category={student.progressCategory} />
                                <button className="px-3 py-1.5 text-xs font-semibold border border-[var(--color-tertiary)]/40 rounded-lg text-[var(--color-font)] hover:bg-[var(--color-primary)]/20 transition-colors">
                                    Contactar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
