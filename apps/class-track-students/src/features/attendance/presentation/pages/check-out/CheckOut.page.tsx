import { LogOut } from "lucide-react";
import { useStudentSessionStore } from "@/core/store/studentSession.store";
import { useSearchStudents } from "@/features/attendance/application/hooks/use-cases/useSearchStudents.hook";
import { useCheckout } from "@/features/attendance/application/hooks/forms/useCheckout.hook";
import { LessonLogsForm } from "@/features/lesson-logs/presentation/components/LessonLogsForm";
import { useNavigate } from "react-router-dom";

export default function CheckOutPage() {
    const studentResponse = useStudentSessionStore((state) => state.studentResponse)!;
    const entryTime = useStudentSessionStore((state) => state.entryTime);
    const hasCreatedLessonLogs = useStudentSessionStore((state) => state.hasCreatedLessonLogs);

    const { data: searchStudentsResponse, isLoading: isSearching } = useSearchStudents(studentResponse.id);
    const { onSubmit, isSubmitting } = useCheckout();

    const studentInfo = searchStudentsResponse?.data?.[0];
    const initial = studentInfo?.fullName ? studentInfo.fullName.charAt(0).toUpperCase() : "";
    const firstName = studentInfo?.fullName ? studentInfo.fullName.split(" ")[0] : "";

    const navigation = useNavigate();

    const handleCheckOut = () => {
        if (studentResponse.sessionId) {
            onSubmit(studentResponse.sessionId);
        }

        navigation("/check-in");
    };

    const formattedEntryTime = entryTime
        ? new Intl.DateTimeFormat("es-ES", { hour: "numeric", minute: "numeric", hour12: true }).format(new Date(entryTime))
        : "";

    return (
        <div className="min-h-screen flex flex-col relative bg-primary">
            {/* Header */}
            <div className="text-center pt-12 pb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center">
                        <span className="text-primary font-bold">
                            <img src="logo-salc.png" alt="" />
                        </span>
                    </div>
                    <span className="text-primary-foreground text-2xl font-bold tracking-tight">SALC - Students</span>
                </div>
            </div>

            {/* Toggle tabs */}
            <div className="flex justify-center mb-8">
                <div className="flex bg-black/10 p-1 rounded-xl gap-1">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all bg-card text-primary shadow-sm">
                        <LogOut className="w-4 h-4" />
                        Salida
                    </button>
                </div>
            </div>

            {/* Card */}
            <div className="flex-1 flex items-start justify-center px-4">
                <div className="w-full max-w-lg">
                    <div className="bg-card rounded-2xl p-8 shadow-2xl">
                        {/* Greeting */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                {isSearching ? (
                                    <span className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                                ) : (
                                    <span className="text-primary-foreground font-bold text-xl">{initial}</span>
                                )}
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm">Bienvenido/a de nuevo</p>
                                <h2 className="text-xl font-bold text-title">
                                    {isSearching ? "Cargando..." : `Hola, ${firstName}`}
                                </h2>
                                <p className="text-muted-foreground text-xs mt-0.5">
                                    {formattedEntryTime
                                        ? `Entrada registrada a las ${formattedEntryTime}`
                                        : "Sesión en curso activa"}
                                </p>
                            </div>
                        </div>

                        {/* Lesson Logs Section */}
                        <div className="mb-6">
                            {hasCreatedLessonLogs ? (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                                    <p className="text-green-600 font-medium text-sm">
                                        ¡Lecciones registradas correctamente! Ya puedes solicitar tu salida.
                                    </p>
                                </div>
                            ) : (
                                <LessonLogsForm />
                            )}
                        </div>

                        {/* Check-out Button */}
                        <button
                            onClick={handleCheckOut}
                            disabled={isSubmitting || !studentResponse.sessionId || !hasCreatedLessonLogs}
                            className="w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <LogOut className="w-5 h-5" />
                            {isSubmitting ? "Procesando..." : "Solicitar Salida"}
                        </button>
                        <p className="text-center text-muted-foreground text-xs mt-3">
                            Tu salida sera revisada por un instructor
                        </p>
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
