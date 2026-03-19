import { useState } from "react"
import { useForm, Controller } from "react-hook-form";
import { Users, CheckCircle, Loader2, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Button } from '@/core/components/buttons/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Alert, AlertDescription } from '@/core/components/ui/alert';
import { RegisterUserDto } from '@salc/core/features/shared/indentiy/domain/dtos';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";

export default function RegisterPage() {

    //TODO: borrar estos estados
    const isLoading = false;
    const isAuthorized = true;

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, control, reset, formState: { errors }, watch, } = useForm<RegisterUserDto>({

        defaultValues: {
            us_full_name: '',
            us_email: '',
            us_password_hash: '',
        },
    })

    const selectedRole = watch('us_role')

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!isAuthorized) {
        return null
    }

    const onSubmit = async (data: RegisterUserDto) => {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log('User registered:', data)
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitSuccess(false)
            reset()
        }, 3000)
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Registro de Usuarios
                </h2>
                <p className="text-muted-foreground">
                    Crea cuentas para administradores y profesores del sistema.
                </p>
            </div>

            {submitSuccess && (
                <Alert className="border-success/50 bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <AlertDescription className="text-success">
                        Usuario creado exitosamente. El formulario se reiniciará en breve.
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Nuevo Usuario
                        </CardTitle>
                        <CardDescription>
                            Completa el formulario para crear un nuevo usuario del sistema.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="userFullName">Nombre Completo</Label>
                                    <Input
                                        id="userFullName"
                                        placeholder="Ej: María García López"
                                        {...register('us_full_name')}
                                        aria-invalid={!!errors.us_full_name}
                                    />
                                    {errors.us_full_name && (
                                        <p className="text-sm text-destructive">{errors.us_full_name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userEmail">Correo Electrónico</Label>
                                    <Input
                                        id="userEmail"
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        {...register('us_email')}
                                        aria-invalid={!!errors.us_email}
                                    />
                                    {errors.us_email && (
                                        <p className="text-sm text-destructive">{errors.us_email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userPassword">Contraseña</Label>
                                    <div className="relative">
                                        <Input
                                            id="userPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            {...register('us_password_hash')}
                                            aria-invalid={!!errors.us_password_hash}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.us_password_hash && (
                                        <p className="text-sm text-destructive">{errors.us_password_hash.message}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Mínimo 8 caracteres, una mayúscula y un número.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userRole">Rol de Usuario</Label>
                                    <Controller
                                        name="us_role"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar rol" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ADMIN">
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck className="h-4 w-4 text-primary" />
                                                            Administrador
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="TEACHER">
                                                        <div className="flex items-center gap-2">
                                                            <GraduationCap className="h-4 w-4 text-secondary-foreground" />
                                                            Profesor
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.us_role && (
                                        <p className="text-sm text-destructive">{errors.us_role.message}</p>
                                    )}
                                </div>
                            </div>

                            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creando usuario...
                                    </>
                                ) : (
                                    <>
                                        <Users className="mr-2 h-4 w-4" />
                                        Crear Usuario
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Role Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Información de Roles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div
                            className={`rounded-lg border p-4 transition-colors ${selectedRole === 'ADMIN' ? 'border-primary bg-primary/5' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <h4 className="font-medium text-foreground">Administrador</h4>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Acceso completo al sistema: gestión de usuarios, migración de datos,
                                y todas las funciones de matrícula y niveles.
                            </p>
                        </div>

                        <div
                            className={`rounded-lg border p-4 transition-colors ${selectedRole === 'TEACHER' ? 'border-primary bg-primary/5' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                <h4 className="font-medium text-foreground">Profesor</h4>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Acceso limitado: puede gestionar matrículas de estudiantes y
                                consultar niveles. No tiene acceso a configuración del sistema.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
