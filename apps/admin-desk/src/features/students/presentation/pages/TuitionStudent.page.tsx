import { Controller } from "react-hook-form";
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/core/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/core/components/ui/popover";
import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import { useRegisterStudentForm } from "@/features/students/application/hooks";
import { CalendarIcon, CheckCircle, Loader2, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/core/components/alerts/alert";
import { Button } from "@/core/components/buttons/button";
import { Calendar } from "@/core/components/ui/calendar";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { cn } from "@salc/ui/lib/utils";
import { Nationalities } from "@salc/core/enums";





export default function TuitionStundentPage() {

    const { userResponse } = useAuthStore();

    const { submitSuccess, errors, control, handleSubmit, register, onSubmit, isSubmitting, maxAllowedDate, minDate } = useRegisterStudentForm();


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
                        <UserPlus className="h-5 w-5 text-primary" />
                        Nueva Matrícula
                    </CardTitle>
                    <CardDescription>
                        Completa el formulario para registrar un nuevo estudiante.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="identificationCard">Cédula de Identidad</Label>
                                <Input
                                    id="identificationCard"
                                    type="tel"
                                    placeholder="Ej: 0192395936"
                                    {...register('identificationCard', {
                                        required: 'La cédula es obligatoria',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'La cédula debe tener 10 dígitos'
                                        }
                                    })}
                                    aria-invalid={!!errors.identificationCard}
                                />
                                {errors.identificationCard && (
                                    <p className="text-sm text-destructive">{errors.identificationCard.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Nombre Completo</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Ej: Juan Pérez García"
                                    {...register('fullName', {
                                        required: 'El nombre es obligatorio',
                                        pattern: {
                                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
                                            message: 'El nombre debe contener solo letras'
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'El nombre debe tener al menos 3 caracteres'
                                        }
                                    })}
                                    aria-invalid={!!errors.fullName}
                                />
                                {errors.fullName && (
                                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Teléfono Principal</Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="Ej: +52 555 123 4567"
                                    {...register('phoneNumber', {
                                        required: 'El teléfono es obligatorio',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'El teléfono debe tener 10 dígitos'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'El teléfono debe tener al menos 10 dígitos'
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'El teléfono debe tener menos de 10 dígitos'
                                        }
                                    })}
                                    aria-invalid={!!errors.phoneNumber}
                                />
                                {errors.phoneNumber && (
                                    <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Ej: ejemplo@gmail.com"
                                    {...register('email', {
                                        required: 'El correo es obligatorio'
                                    })}
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Fecha de Inicio</Label>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        'w-full justify-start text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: es })
                                                    ) : (
                                                        <span>Seleccionar fecha</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                                {errors.startDate && (
                                    <p className="text-sm text-destructive">{errors.startDate.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Fecha de nacimiento</Label>
                                <Controller
                                    name="dateOfBirth"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        'w-full justify-start text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: es })
                                                    ) : (
                                                        <span>Seleccionar fecha</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    captionLayout="dropdown"
                                                    fromYear={1920}
                                                    toYear={maxAllowedDate.getFullYear()}
                                                    disabled={(date) => date > maxAllowedDate}
                                                    defaultMonth={minDate}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                                {errors.dateOfBirth && (
                                    <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="certificateType">Tipo de Certificado</Label>
                                <Input
                                    id="certificateType"
                                    placeholder="Ej: ONE TOONE"
                                    {...register('certificateType', {
                                        required: 'El tipo de certificado es obligatorio',
                                        pattern: {
                                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
                                            message: 'El tipo de certificado debe contener solo letras'
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'El tipo de certificado debe tener al menos 3 caracteres'
                                        }
                                    })}
                                    aria-invalid={!!errors.certificateType}
                                />
                                {errors.certificateType && (
                                    <p className="text-sm text-destructive">{errors.certificateType.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nationality">Nacionalidad</Label>
                                <Controller
                                    name="nationality"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar nacionalidad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Nationalities.map((nationality) => (
                                                    <SelectItem key={nationality.id} value={nationality.name}>
                                                        {nationality.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.nationality && (
                                    <p className="text-sm text-destructive">{errors.nationality.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="assignedSeller">Vendedor Asignado</Label>
                            <Input
                                id="fullName"
                                disabled
                                value={userResponse ? (`${userResponse.us_full_name}`) : ('N/A')}
                            />
                        </div>

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
    )
}
