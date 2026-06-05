'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, LogIn, LogOut, Settings } from 'lucide-react';
import { mockStudents } from '@/lib/classtrack-mock-data';
import { Student } from '@/lib/classtrack-types';

interface KioskViewProps {
    onSwitchToAdmin: () => void;
}

type KioskState = 'check-in' | 'check-out';

export function KioskView({ onSwitchToAdmin }: KioskViewProps) {
    const [kioskState, setKioskState] = useState<KioskState>('check-in');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [lessonsCount, setLessonsCount] = useState<number>(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Simulate a student that's already checked in
    const checkedInStudent = mockStudents[0];

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [kioskState]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setSelectedStudent(null);
        if (value.length >= 2) {
            const filtered = mockStudents.filter(
                (student) =>
                    student.studentFullName.toLowerCase().includes(value.toLowerCase()) ||
                    student.studentIdentificationCard.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setSearchQuery(student.studentFullName);
        setSuggestions([]);
    };

    const handleCheckIn = () => {
        if (!selectedStudent) return;
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setSearchQuery('');
            setSelectedStudent(null);
        }, 2000);
    };

    const handleCheckOut = () => {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setKioskState('check-in');
        }, 2000);
    };

    const now = new Date();
    const timeString = now.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div
            className="min-h-screen flex flex-col relative"
            style={{ background: 'linear-gradient(135deg, var(--color-quinary) 0%, #3a7068 50%, #2c5a54 100%)' }}
        >
            {/* Admin button */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={onSwitchToAdmin}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                    aria-label="Ir al panel administrativo"
                    title="Panel Administrativo"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Header */}
            <div className="text-center pt-12 pb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-font-title)] flex items-center justify-center">
                        <span className="text-white font-bold">CT</span>
                    </div>
                    <span className="text-white text-2xl font-bold tracking-tight">ClassTrack</span>
                </div>
                <p className="text-[var(--color-primary)]/80 text-sm capitalize">{dateString}</p>
                <p className="text-white text-4xl font-light mt-1">{timeString}</p>
            </div>

            {/* Toggle tabs */}
            <div className="flex justify-center mb-8">
                <div className="flex bg-white/10 p-1 rounded-xl gap-1">
                    <button
                        onClick={() => setKioskState('check-in')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${kioskState === 'check-in'
                            ? 'bg-white text-[var(--color-quinary)] shadow-sm'
                            : 'text-white/70 hover:text-white'
                            }`}
                    >
                        <LogIn className="w-4 h-4" />
                        Entrada
                    </button>
                    <button
                        onClick={() => setKioskState('check-out')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${kioskState === 'check-out'
                            ? 'bg-white text-[var(--color-quinary)] shadow-sm'
                            : 'text-white/70 hover:text-white'
                            }`}
                    >
                        <LogOut className="w-4 h-4" />
                        Salida
                    </button>
                </div>
            </div>

            {/* Card */}
            <div className="flex-1 flex items-start justify-center px-4">
                <div className="w-full max-w-lg">
                    {showSuccess ? (
                        <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
                            <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[var(--color-quinary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--color-font)]">
                                {kioskState === 'check-in' ? 'Entrada Registrada' : 'Salida Solicitada'}
                            </h2>
                            <p className="text-[var(--color-font)]/60 mt-2">
                                {kioskState === 'check-in'
                                    ? `Bienvenido/a, ${selectedStudent?.studentFullName?.split(' ')[0]}`
                                    : 'Tu salida ha sido enviada para aprobacion'}
                            </p>
                        </div>
                    ) : kioskState === 'check-in' ? (
                        <div className="bg-white rounded-2xl p-8 shadow-2xl">
                            <h2 className="text-xl font-bold text-[var(--color-font)] mb-1">Registrar Entrada</h2>
                            <p className="text-[var(--color-font)]/50 text-sm mb-6">Busca tu nombre o cedula de identidad</p>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-font)]/40" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    placeholder="Nombre completo o N° de cedula..."
                                    className="w-full pl-12 pr-4 py-4 text-[var(--color-font)] text-base border-2 border-[var(--color-tertiary)]/40 rounded-xl focus:outline-none focus:border-[var(--color-quinary)] transition-colors placeholder:text-[var(--color-font)]/30"
                                    autoComplete="off"
                                />

                                {/* Dropdown */}
                                {suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--color-tertiary)]/30 rounded-xl shadow-xl z-10 overflow-hidden">
                                        {suggestions.map((student) => (
                                            <button
                                                key={student.studentId}
                                                onClick={() => handleSelectStudent(student)}
                                                className="w-full px-4 py-3 text-left hover:bg-[var(--color-primary)]/20 transition-colors flex items-center justify-between group"
                                            >
                                                <div>
                                                    <p className="font-semibold text-[var(--color-font)] text-sm">{student.studentFullName}</p>
                                                    <p className="text-[var(--color-font)]/50 text-xs">{student.studentIdentificationCard}</p>
                                                </div>
                                                <span className="text-xs text-[var(--color-quinary)] opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Seleccionar
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Selected Student Preview */}
                            {selectedStudent && (
                                <div className="mt-4 p-4 bg-[var(--color-primary)]/20 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-quinary)] flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">
                                            {selectedStudent.studentFullName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[var(--color-font)] text-sm">{selectedStudent.studentFullName}</p>
                                        <p className="text-[var(--color-font)]/60 text-xs">
                                            {selectedStudent.studentIdentificationCard} &middot; {selectedStudent.studentCertificateType}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Check-in Button */}
                            <button
                                onClick={handleCheckIn}
                                disabled={!selectedStudent}
                                className="w-full mt-6 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    background: selectedStudent ? 'var(--color-font-title)' : 'var(--color-tertiary)',
                                    color: 'var(--white)'
                                }}
                            >
                                <LogIn className="w-5 h-5" />
                                Ingresar
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-8 shadow-2xl">
                            {/* Greeting */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-[var(--color-quinary)] flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-xl">
                                        {checkedInStudent.studentFullName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[var(--color-font)]/50 text-sm">Bienvenido/a de nuevo</p>
                                    <h2 className="text-xl font-bold text-[var(--color-font)]">
                                        Hola, {checkedInStudent.studentFullName.split(' ')[0]}
                                    </h2>
                                    <p className="text-[var(--color-font)]/50 text-xs mt-0.5">
                                        Entrada registrada a las 08:15 AM
                                    </p>
                                </div>
                            </div>

                            {/* Lessons dropdown */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-[var(--color-font)] mb-2">
                                    Lecciones estudiadas hoy
                                </label>
                                <select
                                    value={lessonsCount}
                                    onChange={(e) => setLessonsCount(Number(e.target.value))}
                                    className="w-full px-4 py-3.5 border-2 border-[var(--color-tertiary)]/40 rounded-xl text-[var(--color-font)] font-medium focus:outline-none focus:border-[var(--color-quinary)] transition-colors appearance-none bg-white"
                                >
                                    <option value={1}>1 leccion (14)</option>
                                    <option value={2}>2 lecciones (14 y 15)</option>
                                    <option value={3}>3 lecciones (14, 15 y 16)</option>
                                </select>
                            </div>

                            {/* Check-out Button */}
                            <button
                                onClick={handleCheckOut}
                                className="w-full py-4 rounded-xl font-bold text-base text-white transition-all flex items-center justify-center gap-2"
                                style={{ background: 'var(--color-quinary)' }}
                            >
                                <LogOut className="w-5 h-5" />
                                Solicitar Salida
                            </button>
                            <p className="text-center text-[var(--color-font)]/40 text-xs mt-3">
                                Tu salida sera revisada por un instructor
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="text-center pb-8 mt-8">
                <p className="text-white/30 text-xs">ClassTrack &copy; {new Date().getFullYear()} &middot; Sistema de Gestion Academica</p>
            </div>
        </div>
    );
}
