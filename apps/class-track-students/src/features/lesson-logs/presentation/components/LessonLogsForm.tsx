import { useStudentSessionStore } from "@/core/store/studentSession.store";
import { useLessonLogsForm } from "../../application/hooks/forms/useLessonLogsForm.hook";
import { Plus, Trash2, Save } from "lucide-react";

export const LessonLogsForm = () => {
    const studentResponse = useStudentSessionStore((state) => state.studentResponse)!;
    const setHasCreatedLessonLogs = useStudentSessionStore((state) => state.setHasCreatedLessonLogs);

    const handleSuccess = () => {
        setHasCreatedLessonLogs(true);
    };

    const { lessons, addLesson, updateLesson, removeLesson, onSubmit, isSubmitting } = useLessonLogsForm({
        attendanceSessionId: studentResponse.sessionId,
        onSuccessCallback: handleSuccess,
    });

    return (
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/40">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-title">Registro de Lecciones</h3>
                {lessons.length < 3 && (
                    <button
                        onClick={() => addLesson()}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Añadir
                    </button>
                )}
            </div>

            {lessons.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">No has añadido ninguna lección todavía.</div>
            ) : (
                <div className="space-y-4 mb-6">
                    {lessons.map((lesson, index) => (
                        <div key={lesson.id} className="p-4 rounded-xl border-2 border-border/40 relative">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-sm font-semibold text-title">Lección #{index + 1}</h4>
                                <button
                                    onClick={() => removeLesson(lesson.id)}
                                    type="button"
                                    className="text-red-500 hover:text-red-600 transition-colors p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                                        Número de Lección
                                    </label>
                                    <input
                                        type="number"
                                        value={lesson.lessonNumber}
                                        onChange={(e) => updateLesson(lesson.id, { lessonNumber: e.target.value })}
                                        className="w-full px-3 py-2 border-2 border-border/40 rounded-lg text-sm font-medium focus:outline-none focus:border-primary transition-colors bg-background"
                                        placeholder="Ej: 5"
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                                        Puntuación Oral (Opcional)
                                    </label>
                                    <input
                                        type="number"
                                        value={lesson.oralPracticeScore || ""}
                                        onChange={(e) => updateLesson(lesson.id, { oralPracticeScore: e.target.value })}
                                        className="w-full px-3 py-2 border-2 border-border/40 rounded-lg text-sm font-medium focus:outline-none focus:border-primary transition-colors bg-background"
                                        placeholder="Ej: 100"
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                <div className="sm:col-span-2 flex items-center gap-2 mt-1">
                                    <input
                                        type="checkbox"
                                        id={`completed-${lesson.id}`}
                                        checked={lesson.isCompleted}
                                        onChange={(e) => updateLesson(lesson.id, { isCompleted: e.target.checked })}
                                        className="w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                                    />
                                    <label
                                        htmlFor={`completed-${lesson.id}`}
                                        className="text-sm font-medium text-title cursor-pointer"
                                    >
                                        Lección completada
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={onSubmit}
                disabled={lessons.length === 0 || isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Save className="w-4 h-4" />
                {isSubmitting ? "Guardando..." : "Guardar Lecciones"}
            </button>
        </div>
    );
};
