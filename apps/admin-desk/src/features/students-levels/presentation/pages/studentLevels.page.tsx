import AdminStudentsLevels from "@/features/students-levels/presentation/components/admin-students-levels"

export default function StudentLevelsPage() {

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Niveles de Estudiantes
                </h2>
                <p className="text-muted-foreground">
                    Consulta el progreso de los estudiantes y gestiona sus módulos.
                </p>
            </div>

            <AdminStudentsLevels />
        </div>
    );

}
