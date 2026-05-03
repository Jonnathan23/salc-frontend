import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import { useRegisterStudentForm } from "@/features/students/application/hooks";
import { BookPlus, CheckCircle, Loader2, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/core/components/alerts/alert";
import { Button } from "@/core/components/buttons/button";
import StudentForm from "@/features/students/presentation/components/register-update/StudentForm";

export default function TuitionStundentPage() {
    const { userResponse } = useAuthStore();
    const assignedSeller = userResponse ? userResponse.us_full_name : 'N/A';

    const { submitSuccess, errors, control, handleSubmit, register, onSubmit, isSubmitting, maxAllowedDate, minDate, certificates } = useRegisterStudentForm();

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Matrícula de Estudiantes
                </h2>
                <p className="text-muted-foreground">
                    Registra nuevos estudiantes y asigna módulos de estudio.
                </p>
            </div>

            {submitSuccess && (
                <Alert className="border-success/50 bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <AlertDescription className="text-success">
                        Estudiante matriculado exitosamente. El formulario se reiniciará en breve.
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookPlus className="h-5 w-5 text-primary" />
                        Nueva Matrícula
                    </CardTitle>
                    <CardDescription>
                        Completa el formulario para registrar un nuevo estudiante.
                    </CardDescription>
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

                        <div className="flex justify-end pt-4 border-t border-border/50">
                            <Button type="submit" className={`hover:bg-primary/80 w-full md:w-auto ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Registrando...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Registrar Estudiante
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}