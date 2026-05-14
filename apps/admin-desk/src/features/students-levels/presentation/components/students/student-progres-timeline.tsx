import { Calendar, CheckCircle, Layers, Loader2, Phone, ShoppingCart, User } from "lucide-react";

import AvailableModulesForUpsell from "@/features/students-levels/presentation/components/levels/available-modules-upsell-item";
import { Alert, AlertDescription } from "@/core/components/alerts/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import StudentLevelItem from "@/features/students-levels/presentation/components/levels/student-level-item";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { StudentLevelDetailsEntity } from "@salc/core/features/admin-desk/students-level/domain/entities";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { ClassValue } from "class-variance-authority/types";


interface StudentProgressTimelineProps {
    selectedStudent: StudentEntity | null;
    studentLevels: StudentLevelDetailsEntity[]
    addedModule: string | null
    availableModulesForUpsell: ModuleEntity[]
    isLoading: boolean

    cnFunction: (...inputs: ClassValue[]) => string
    handleAddModule: (moduleId: string) => void
}

export default function StudentProgressTimeline(props: StudentProgressTimelineProps) {

    const { selectedStudent, studentLevels, addedModule, availableModulesForUpsell, isLoading
        , cnFunction, handleAddModule } = props
    const isThereStudentLevels = studentLevels.length;


    const renderTimelineAndUpsell = () => {
        if (isLoading) return (
            <p className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando progreso...
            </p>
        );

        return (
            <>
                {/* Module Timeline */}
                <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Módulos Inscritos</h4>
                    <div className="relative space-y-4 pl-6">
                        <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-border" />
                        {isThereStudentLevels ? (
                            studentLevels.map((level) => (
                                <StudentLevelItem
                                    key={level.id}
                                    level={level}
                                    cnFunction={cnFunction}
                                />
                            ))
                        ) : (
                            <p className="text-muted-foreground">El estudiante no tiene módulos inscritos</p>
                        )}
                    </div>
                </div>

                {/* Upselling Section */}
                {availableModulesForUpsell.length > 0 && (
                    <div className="space-y-3 border-t pt-4">
                        <h4 className="flex items-center gap-2 font-medium text-foreground">
                            <ShoppingCart className="h-4 w-4 text-primary" />
                            Módulos Disponibles para Agregar
                        </h4>

                        {addedModule && (
                            <Alert className="border-success/50 bg-success/10">
                                <CheckCircle className="h-4 w-4 text-success" />
                                <AlertDescription className="text-success">
                                    Módulo agregado exitosamente (simulación).
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="grid gap-2 sm:grid-cols-2">
                            {availableModulesForUpsell.map((module) => (
                                <AvailableModulesForUpsell
                                    key={module.mo_id}
                                    module={module}
                                    handleAddModule={handleAddModule}
                                    isDisabled={addedModule === module.mo_id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    };

    const renderMainContent = () => {
        if (!selectedStudent) return (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <Layers className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                    Selecciona un estudiante de la lista para ver su progreso y módulos.
                </p>
            </div>
        );

        return (
            <div className="space-y-6">
                {/* Student Info */}
                <div className="grid gap-4 rounded-lg bg-muted p-4 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Nombre</p>
                            <p className="text-sm font-medium">{selectedStudent.fullName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Teléfono</p>
                            <p className="text-sm font-medium">{selectedStudent.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Inicio</p>
                            <p className="text-sm font-medium">
                                {selectedStudent.startDate.toLocaleDateString('es-MX')}
                            </p>
                        </div>
                    </div>
                </div>

                {renderTimelineAndUpsell()}
            </div>
        );
    };

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Layers className="h-5 w-5 text-primary" />
                    Progreso del Estudiante
                </CardTitle>
                <CardDescription>
                    {selectedStudent
                        ? `Línea de tiempo de ${selectedStudent.fullName}`
                        : 'Selecciona un estudiante para ver su progreso'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {renderMainContent()}
            </CardContent>
        </Card>
    );
}
