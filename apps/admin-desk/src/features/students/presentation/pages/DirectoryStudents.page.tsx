import { BookOpen, Loader2 } from "lucide-react";


import { useGetAllStudents } from "@/features/students/application/hooks";
import StudentItem from "@/features/students/presentation/components/StudentItem";



export default function DirectoryStudents() {

    const { data: successResponse, isLoading } = useGetAllStudents();
    const students = successResponse?.data ?? [];
    

    if (isLoading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );

    return (

        <div className="bg-card text-card-foreground rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-title" />
                <h2 className="font-semibold text-title text-sm">Directorio de Estudiantes</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-primary/20">
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Estudiante</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Cedula</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Certificado</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Contrato</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">Progreso</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {students.map((student) => (
                            <StudentItem key={student.id} student={student} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}