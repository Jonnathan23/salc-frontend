import { Users, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Button } from "@/core/components/admin-desk/buttons/button";
import { useFormUser } from "@/features/shared/identity/application/hooks";
import UserForm from "@/features/shared/identity/presentation/components/register-update/UserForm";

interface RegisterUserFormProps {
    onRoleChange: (role: string) => void;
    onSuccess: () => void;
}
export const RegisterUserForm = ({ onRoleChange, onSuccess }: RegisterUserFormProps) => {
    const { register, handleSubmit, control, errors, isPending, onSubmit, showPassword, handleSetShowPassword } =
        useFormUser({ onRoleChange, onSuccess });

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 ">
                    <Users className="h-5 w-5 text-primary" />
                    Nuevo Usuario
                </CardTitle>
                <CardDescription className="text-foreground">
                    Completa el formulario para crear un nuevo usuario del sistema.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <UserForm
                        register={register}
                        control={control}
                        errors={errors}
                        showPassword={showPassword}
                        handleSetShowPassword={handleSetShowPassword}
                    />

                    <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando usuario...
                            </>
                        ) : (
                            <>
                                <Users className="mr-2 h-4 w-4" /> Crear Usuario
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
