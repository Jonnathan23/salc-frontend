import { useState } from "react";
import { LogIn } from "lucide-react";

import { ComboBox } from "@/core/components/search/ComboBox";
import { useCheckIn } from "@/features/attendance/application/hooks/forms/useCheckIn.hook";
import { useSearchStudents } from "@/features/attendance/application/hooks/use-cases/useSearchStudents.hook";

export default function CheckInPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isComboOpen, setIsComboOpen] = useState(false);

    const { onSubmit, isSubmitting } = useCheckIn();
    const { data: searchStudentsResponse, isLoading: isSearching } = useSearchStudents(searchTerm);

    const searchStudentsList = searchStudentsResponse?.data || [];

    const [selectedStudent, setSelectedStudent] = useState<{ id: string; fullName: string; identificationCard: string } | null>(
        null,
    );

    const handleSelectStudent = (id: string, identificationCard: string, fullName: string) => {
        setSelectedStudent({ id, identificationCard, fullName });
        setIsComboOpen(false);
        setSearchTerm("");
    };

    const handleCheckIn = () => {
        if (!selectedStudent) return;
        onSubmit({ studentId: selectedStudent.id });
        setSelectedStudent(null);
    };

    const now = new Date();
    const timeString = now.toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" });
    const dateString = now.toLocaleDateString("es-VE", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="min-h-screen flex flex-col relative bg-primary">
            {/* Header */}
            <div className="text-center pt-12 pb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center">
                        <span className="text-primary font-bold">CT</span>
                    </div>
                    <span className="text-primary-foreground text-2xl font-bold tracking-tight">ClassTrack</span>
                </div>
                <p className="text-primary-foreground/80 text-sm capitalize">{dateString}</p>
                <p className="text-primary-foreground text-4xl font-light mt-1">{timeString}</p>
            </div>

            {/* Toggle tabs */}
            <div className="flex justify-center mb-8">
                <div className="flex bg-black/10 p-1 rounded-xl gap-1">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all bg-card text-primary shadow-sm">
                        <LogIn className="w-4 h-4" />
                        Entrada
                    </button>
                </div>
            </div>

            {/* Card */}
            <div className="flex-1 flex items-start justify-center px-4">
                <div className="w-full max-w-lg">
                    <div className="bg-card rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-xl font-bold text-title mb-1">Registrar Entrada</h2>
                        <p className="text-muted-foreground text-sm mb-6">Busca tu nombre o cedula de identidad</p>

                        {/* Search */}
                        <div className="relative">
                            <ComboBox
                                value={searchTerm}
                                onChange={setSearchTerm}
                                placeholder="Buscar por cédula o nombre..."
                                isLoading={isSearching}
                                isOpen={isComboOpen}
                                onOpenChange={setIsComboOpen}
                                hasResults={!!searchStudentsList && searchStudentsList.length > 0}
                            >
                                {searchStudentsList?.map((student) => (
                                    <li
                                        key={student.studentId}
                                        onClick={() =>
                                            handleSelectStudent(student.studentId, student.identificationCard, student.fullName)
                                        }
                                        className="px-3 py-2 cursor-pointer hover:bg-muted/50 transition-colors flex flex-col"
                                    >
                                        <span className="text-sm font-medium text-foreground">{student.fullName}</span>
                                        <span className="text-xs text-muted-foreground font-mono mt-0.5">
                                            {student.identificationCard}
                                        </span>
                                    </li>
                                ))}
                            </ComboBox>
                        </div>

                        {/* Selected Student Preview */}
                        {selectedStudent && (
                            <div className="mt-4 p-4 bg-muted rounded-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary-foreground font-bold text-sm">
                                        {selectedStudent.fullName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground text-sm">{selectedStudent.fullName}</p>
                                    <p className="text-muted-foreground text-xs">{selectedStudent.identificationCard}</p>
                                </div>
                            </div>
                        )}

                        {/* Check-in Button */}
                        <button
                            onClick={handleCheckIn}
                            disabled={!selectedStudent || isSubmitting}
                            className={`w-full mt-6 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${selectedStudent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                        >
                            <LogIn className="w-5 h-5" />
                            {isSubmitting ? "Ingresando..." : "Ingresar"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center pb-8 mt-8">
                <p className="text-primary-foreground/50 text-xs">
                    ClassTrack &copy; {new Date().getFullYear()} &middot; Sistema de Gestion Academica
                </p>
            </div>
        </div>
    );
}
