import { useMemo, useState } from "react"
import { Calendar, CheckCircle, Layers, Phone, Plus, Search, ShoppingCart, User } from "lucide-react"

import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card"
import { Input } from "@/core/components/ui/input"
import { useGetAllStudents } from "@/features/students/application/hooks"
import { useGetAllModules } from "@/features/modules/application/hooks"
import { useGetAllStudentLevels } from "@/features/students-levels/application/hooks/use-cases"

import { Badge } from "@/core/components/ui/badge"
import { cn } from "@salc/ui/lib/utils"
import { statusConfig } from "@/features/students-levels/presentation/data/statusConfig"
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity"
import { Alert, AlertDescription } from "@/core/components/alerts/alert"
import { Button } from "@/core/components/buttons/button"

export default function StudentLevelsPage() {

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStudent, setSelectedStudent] = useState<StudentEntity | null>(null)
    const [addedModule, setAddedModule] = useState<string | null>(null)

    const { data: responseStudents, isLoading } = useGetAllStudents();
    const allStudents = useMemo(() => responseStudents?.data || [], [responseStudents]);

    const filteredStudents = useMemo(() => {

        if (isLoading || !allStudents || allStudents.length === 0) return [];
        if (!searchQuery.trim()) return allStudents;

        const query = searchQuery.toLowerCase()

        return allStudents.filter((student) =>
            student.fullName.toLowerCase().includes(query) ||
            student.identificationCard.toLowerCase().includes(query) ||
            student.phoneNumber.includes(query) ||
            student.email.toLowerCase().includes(query)
        );
    }, [searchQuery, isLoading, allStudents])

    const { data: responseModules, isLoading: isLoadingModules } = useGetAllModules();
    const { data: responseStudentLevels, isLoading: isLoadingStudentLevels } = useGetAllStudentLevels(selectedStudent?.id || '');

    const studentLevels = useMemo(() => responseStudentLevels?.data || [], [responseStudentLevels]);
    const allEnglishModules = useMemo(() => responseModules?.data || [], [responseModules]);

    const availableModulesForUpsell: ModuleEntity[] = useMemo(() => {
        if (isLoading || !allEnglishModules || !studentLevels) return [];

        return allEnglishModules.filter((module) => {
            return !studentLevels.some((studentLevel) => studentLevel.module.mo_id === module.mo_id)
        })

    }, [isLoading, allEnglishModules, studentLevels])


    const handleAddModule = (moduleId: string) => {
        setAddedModule(moduleId)
        setTimeout(() => setAddedModule(null), 2000)
    }

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

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Student Search and List */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Search className="h-5 w-5 text-primary" />
                            Buscar Estudiante
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Nombre o teléfono..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="space-y-2">
                            {filteredStudents.length === 0 ? (
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    No se encontraron estudiantes
                                </p>
                            ) : (
                                filteredStudents.map((student) => (
                                    <button
                                        key={student.id}
                                        onClick={() => setSelectedStudent(student)}
                                        className={cn(
                                            'w-full rounded-lg border p-3 text-left transition-colors hover:border-primary',
                                            selectedStudent?.id === student.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border'
                                        )}
                                    >
                                        <p className="font-medium text-foreground">{student.fullName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {studentLevels.length} módulo(s) inscrito(s)
                                        </p>
                                    </button>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Student Progress Timeline */}
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
                        {selectedStudent ? (
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

                                {/* Module Timeline */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-foreground">Módulos Inscritos</h4>
                                    <div className="relative space-y-4 pl-6">
                                        {/* Timeline line */}
                                        <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-border" />

                                        {studentLevels.map((level) => {
                                            const config = statusConfig[level.status]
                                            const Icon = config.icon

                                            return (
                                                <div key={level.id} className="relative flex items-start gap-4">
                                                    {/* Timeline dot */}
                                                    <div
                                                        className={cn(
                                                            'absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-background',
                                                            level.status === 'APPROVED'
                                                                ? 'border-success'
                                                                : level.status === 'ACTIVE'
                                                                    ? 'border-primary'
                                                                    : 'border-muted-foreground'
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                'h-2 w-2 rounded-full',
                                                                level.status === 'APPROVED'
                                                                    ? 'bg-success'
                                                                    : level.status === 'ACTIVE'
                                                                        ? 'bg-primary'
                                                                        : 'bg-muted-foreground'
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="flex-1 rounded-lg border p-3">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-medium text-foreground">{level.module.mo_name}</p>
                                                            <Badge variant={config.variant} className={config.className}>
                                                                <Icon className="mr-1 h-3 w-3" />
                                                                {config.label}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
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
                                                <div
                                                    key={module.mo_id}
                                                    className="flex items-center justify-between rounded-lg border p-3"
                                                >
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleAddModule(module.mo_id)}
                                                        disabled={addedModule === module.mo_id}
                                                    >
                                                        <Plus className="mr-1 h-3 w-3" />
                                                        Agregar
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                                <Layers className="mb-4 h-12 w-12 text-muted-foreground/50" />
                                <p className="text-muted-foreground">
                                    Selecciona un estudiante de la lista para ver su progreso y módulos.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}
