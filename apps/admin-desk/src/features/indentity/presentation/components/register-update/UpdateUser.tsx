import { useState } from "react"

import { PageHeader, RoleInfoCard } from "@/features/indentity/presentation/components/register-update/StateForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Button } from '@/core/components/buttons/button';
import { useUpdateFormUser } from '@/features/indentity/application/hooks';
import UserForm from '@/features/indentity/presentation/components/register-update/UserForm';
import type { UserRoles } from "@salc/core/interfaces";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentiy/domain/entities";
import { ArrowLeft, Loader2, Users } from "lucide-react";

interface UpdateUserProps {
    userId: string;
    user: UserAuthResponseEntity
    handleSetEdit: () => void;
}

export default function UpdateUser({ userId, user, handleSetEdit }: UpdateUserProps) {

    const [selectedRole, setSelectedRole] = useState<UserRoles>(user?.us_role as UserRoles);

    const handleRoleChange = (role: UserRoles) => setSelectedRole(role);

    const { register, handleSubmit, control, errors, isPending,
        onSubmit, showPassword, handleSetShowPassword } = useUpdateFormUser({
            defaultValues: user,
            id: userId,
            onRoleChange: handleRoleChange
        });

    return (
        <div className="space-y-6">
            <PageHeader />

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    {/* Convertimos el CardHeader en un contenedor Flex para separar el título del botón */}
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-border/50 pb-6 mb-6">
                        <div className="space-y-1.5">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Actualizar Usuario
                            </CardTitle>
                            <CardDescription>
                                Completa el formulario para actualizar el usuario del sistema.
                            </CardDescription>
                        </div>

                        {/* El botón de volver queda seguro en la esquina superior derecha */}
                        <Button variant="outline" size="sm" onClick={handleSetEdit} className="shrink-0">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver al perfil
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <UserForm
                                register={register}
                                control={control}
                                errors={errors}
                                showPassword={showPassword}
                                handleSetShowPassword={handleSetShowPassword}
                                isEditing={true}
                            />

                            {/* Botón de Submit corregido con los textos de "Actualizar" */}
                            <div className="flex justify-end pt-4 border-t border-border/50">
                                <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                                    {isPending ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Actualizando usuario...</>
                                    ) : (
                                        <><Users className="mr-2 h-4 w-4" /> Actualizar Usuario</>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <RoleInfoCard selectedRole={selectedRole} />
            </div>
        </div>
    );
}
