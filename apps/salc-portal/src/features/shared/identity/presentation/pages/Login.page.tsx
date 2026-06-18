import { useState } from "react";
import { GraduationCap, Loader2, Eye, EyeOff } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/Card";
import { Alert, AlertDescription } from "@/core/components/ui/admin-desk/alerts/Alert";
import { useLoginForm } from "@/features/shared/identity/application/hooks";
import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { Input } from "@/core/components/ui/Input";
import { Label } from "@/core/components/ui/Label";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, errors, isPendingLogin, isError, errorLogin, onSubmit } = useLoginForm();

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <GraduationCap className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-foreground">SALC - Cuenca</CardTitle>
                        <CardDescription className="text-muted-foreground">Sistema de Gestión de Estudiantes</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {isError && (
                            <Alert variant="destructive">
                                <AlertDescription>{errors.root?.message || errorLogin?.message}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                {...register("email")}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="passwordHash">Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="passwordHash"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("passwordHash")}
                                    aria-invalid={!!errors.passwordHash}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.passwordHash && <p className="text-sm text-destructive">{errors.passwordHash.message}</p>}
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
