import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/core/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/core/components/ui/popover";
import { Calendar } from "@/core/components/ui/calendar";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Nationalities } from "@salc/core/enums";
import { CalendarIcon } from "lucide-react";
import { cn } from "@salc/ui/lib/utils";
import { Button } from "@/core/components/buttons/button";
import type { CertificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import type { BaseStudentFormValues } from "@/features/students/presentation/interfaces"; // Ajusta la ruta si es necesario


interface StudentFormProps {
    errors: FieldErrors<BaseStudentFormValues>;
    control: Control<BaseStudentFormValues>;
    register: UseFormRegister<BaseStudentFormValues>;
    maxAllowedDate: Date;
    minDate: Date;
    certificates: CertificateType[];
    assignedSellerName: string;
}

export default function StudentForm(options: StudentFormProps) {
    const { errors, control, register, maxAllowedDate, minDate, certificates, assignedSellerName } = options;

    return (
        <div className="space-y-6">
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
                        placeholder="Ej: 092 685 3500"
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
                    <Controller
                        name="certificateType"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar tipo de certificado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {certificates.map((certificate) => (
                                        <SelectItem key={certificate} value={certificate}>
                                            {certificate}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
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
                    id="assignedSeller"
                    disabled
                    value={assignedSellerName}
                />
            </div>
        </div>
    );
}