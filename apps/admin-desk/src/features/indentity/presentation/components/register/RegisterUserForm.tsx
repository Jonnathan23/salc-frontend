import { Controller } from 'react-hook-form';
import { Users, Loader2, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Button } from '@/core/components/buttons/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";
import { useFormUser } from '@/features/indentity/application/hooks';




interface RegisterUserFormProps {
    onRoleChange: (role: string) => void;
    onSuccess: () => void;
}

export const RegisterUserForm = ({ onRoleChange, onSuccess }: RegisterUserFormProps) => {
    const { register, handleSubmit, control, errors, isPending,
        onSubmit, showPassword, handleSetShowPassword } = useFormUser({ onRoleChange, onSuccess });

    return (
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
                                    onClick={() => handleSetShowPassword()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.us_password_hash && (
                                <p className="text-sm text-destructive">{errors.us_password_hash.message}</p>
                            )}
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

                    <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                        {isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando usuario...</>
                        ) : (
                            <><Users className="mr-2 h-4 w-4" /> Crear Usuario</>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};