import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/Card";
import { ArrowLeft, BookPlus, CheckCircle, Loader2, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/core/components/ui/admin-desk/alerts/Alert";
import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { useUpdateStudentForm } from "@/features/admin-desk/students/application/hooks/forms/useUpdateFormStudent.use";
import { StudentFormMapper } from "@/features/admin-desk/students/presentation/mappers/studentForm.mapper";
import StudentForm from "@/features/admin-desk/students/presentation/components/register-update/StudentForm";
import type { UserEntity } from "@salc/core/features/shared/identity/domain/entities";

interface UpdateStudentProps {
    readonly studentId: string;
    readonly student: StudentEntity;
    readonly assignedSeller: UserEntity["fullName"];
    readonly handleSetEdit: () => void;
}

export default function UpdateStudent({ studentId, student, assignedSeller, handleSetEdit }: UpdateStudentProps) {
    const submitSuccess = false;
    const { handleSubmit, isSubmitting, onSubmit, control, register, errors, minDate, maxAllowedDate, certificates } =
        useUpdateStudentForm({
            defaultValues: StudentFormMapper.toBaseFormValues(student),
            id: studentId,
        });

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Perfil del Estudiante</h2>
                <p className="text-muted-foreground">Actualiza la información del estudiante.</p>
            </div>

            {submitSuccess && (
                <Alert className="border-success/50 bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <AlertDescription className="text-success">
                        Estudiante matriculado exitosamente. El formulario se reiniciará en breve.
                    </AlertDescription>
                </Alert>
            )}

            <Card className="lg:col-span-2">
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-border/50 pb-6 mb-6">
                    <div className="space-y-1.5">
                        <CardTitle className="flex items-center gap-2">
                            <BookPlus className="h-5 w-5 text-primary" />
                            Nueva Matrícula
                        </CardTitle>
                        <CardDescription>Completa el formulario para registrar un nuevo estudiante.</CardDescription>
                    </div>
                    <Button variant="outline" onClick={handleSetEdit} className="shrink-0">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <StudentForm
                            register={register}
                            control={control}
                            errors={errors}
                            maxAllowedDate={maxAllowedDate}
                            minDate={minDate}
                            certificates={certificates}
                            assignedSellerName={assignedSeller}
                        />

                        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Actualizando...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Actualizar datos del Estudiante
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
