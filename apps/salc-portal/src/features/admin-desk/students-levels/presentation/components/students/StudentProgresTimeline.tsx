import { BookPlus, Calendar, Layers, Loader2, Phone, ShoppingCart, User } from "lucide-react";

import AvailableModulesForUpsell from "@/features/admin-desk/students-levels/presentation/components/levels/AvailableModulesUpsellItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/Card";
import StudentLevelItem from "@/features/admin-desk/students-levels/presentation/components/levels/StudentLevelItem";
import type { ClassValue } from "class-variance-authority/types";
import ModulesSelectedForUpsellItem from "@/features/admin-desk/students-levels/presentation/components/levels/ModulesSelectedUpsellItem";
import { Button } from "@/core/components/ui/admin-desk/buttons/Button";

import type {
    TimelineStudentInfo,
    TimelineEnrolledLevel,
    TimelineAvailableModule,
} from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";

interface StudentProgressTimelineProps {
    studentTimelineInfo: TimelineStudentInfo | null;
    studentLevels: TimelineEnrolledLevel[];
    modulesSelectedForUpsell: TimelineAvailableModule[];
    availableModulesForUpsell: TimelineAvailableModule[];
    isLoading: boolean;
    isLoadingPurchaseModules: boolean;
    canUserPurchaseModules: boolean;

    cnFunction: (...inputs: ClassValue[]) => string;
    handleAddModulesForUpsell: (newModule: TimelineAvailableModule) => void;
    handleRemoveModulesForUpsell: (removeModule: TimelineAvailableModule) => void;
    handlePurchaseModules: () => void;
}

export default function StudentProgressTimeline(props: StudentProgressTimelineProps) {
    const {
        studentTimelineInfo,
        studentLevels,
        modulesSelectedForUpsell,
        availableModulesForUpsell,
        isLoading,
        isLoadingPurchaseModules,
        canUserPurchaseModules,
        cnFunction,
        handleAddModulesForUpsell,
        handleRemoveModulesForUpsell,
        handlePurchaseModules,
    } = props;

    const isThereStudentLevels = studentLevels.length;

    const renderTimelineAndUpsell = () => {
        if (isLoading)
            return (
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
                                <StudentLevelItem key={level.contractId} level={level} cnFunction={cnFunction} />
                            ))
                        ) : (
                            <p className="text-muted-foreground">El estudiante no tiene módulos inscritos</p>
                        )}
                    </div>
                </div>

                {canUserPurchaseModules && (
                    <>
                        {/* Upselling Section */}
                        {availableModulesForUpsell.length > 0 && (
                            <div className="space-y-3 border-t pt-4">
                                <h4 className="flex items-center gap-2 font-medium text-foreground">
                                    <BookPlus className="h-4 w-4 text-primary" />
                                    Módulos Disponibles para Agregar
                                </h4>

                                <div className="grid gap-2 sm:grid-cols-2">
                                    {availableModulesForUpsell.map((module) => (
                                        <AvailableModulesForUpsell
                                            key={module.moduleId}
                                            module={module}
                                            modulesSelectedForUpsell={modulesSelectedForUpsell}
                                            handleAddModulesForUpsell={handleAddModulesForUpsell}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upselling Section */}

                        {modulesSelectedForUpsell.length > 0 && (
                            <div className="space-y-3 border-t pt-4">
                                <h4 className="flex items-center gap-2 font-medium text-foreground">
                                    <ShoppingCart className="h-4 w-4 text-destructive" />
                                    Módulos Seleccionados
                                </h4>

                                <div className="grid gap-2 sm:grid-cols-2">
                                    {modulesSelectedForUpsell.map((module) => (
                                        <ModulesSelectedForUpsellItem
                                            key={module.moduleId}
                                            module={module}
                                            handleRemoveModulesForUpsell={handleRemoveModulesForUpsell}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <Button
                                onClick={handlePurchaseModules}
                                disabled={modulesSelectedForUpsell.length === 0 || isLoadingPurchaseModules}
                            >
                                {isLoadingPurchaseModules && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Comprar Módulos
                            </Button>
                        </div>
                    </>
                )}
            </>
        );
    };

    const renderMainContent = () => {
        if (!studentTimelineInfo)
            return (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                    <Layers className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Selecciona un estudiante de la lista para ver su progreso y módulos.</p>
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
                            <p className="text-sm font-medium">{studentTimelineInfo.fullName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Teléfono</p>
                            <p className="text-sm font-medium">{studentTimelineInfo.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Inicio</p>
                            <p className="text-sm font-medium">{studentTimelineInfo.startDate.toLocaleDateString("es-MX")}</p>
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
                    {studentTimelineInfo
                        ? `Línea de tiempo de ${studentTimelineInfo.fullName}`
                        : "Selecciona un estudiante para ver su progreso"}
                </CardDescription>
            </CardHeader>
            <CardContent>{renderMainContent()}</CardContent>
        </Card>
    );
}
