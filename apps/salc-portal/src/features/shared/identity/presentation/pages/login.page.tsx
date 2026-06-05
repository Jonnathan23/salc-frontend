import { GraduationCap, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Alert, AlertDescription } from "@/core/components/admin-desk/alerts/alert";
import { useLoginForm } from "@/features/shared/identity/application/hooks";
import { Button } from "@/core/components/admin-desk/buttons/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";

export default function LoginPage() {
    const isLoading = false;

    const { register, handleSubmit, errors, isPendingLogin, isError, errorLogin, onSubmit } = useLoginForm();

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <GraduationCap className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-foreground">SALC - Cuenca</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Sistema de Gestión de Estudiantes
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {isError && (
                            <Alert variant="destructive">
                                <AlertDescription>{errors.root?.message || errorLogin?.message}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="userEmail">Correo Electrónico</Label>
                            <Input
                                id="userEmail"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                {...register("us_email")}
                                aria-invalid={!!errors.us_email}
                            />
                            {errors.us_email && <p className="text-sm text-destructive">{errors.us_email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="userPassword">Contraseña</Label>
                            <Input
                                id="userPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register("us_password_hash")}
                                aria-invalid={!!errors.us_password_hash}
                            />
                            {errors.us_password_hash && (
                                <p className="text-sm text-destructive">{errors.us_password_hash.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isPendingLogin}>
                            {isPendingLogin ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
