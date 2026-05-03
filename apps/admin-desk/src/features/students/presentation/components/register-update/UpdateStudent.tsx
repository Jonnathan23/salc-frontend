

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { BookPlus, CalendarIcon, CheckCircle, Loader2, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/core/components/alerts/alert";
import { Button } from "@/core/components/buttons/button";


export default function UpdateStuden() {
    const submitSuccess = false;
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Perfil del Estudiante
                </h2>
                <p className="text-muted-foreground">
                    Actualiza la información del estudiante.
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
                        

                        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
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
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}
