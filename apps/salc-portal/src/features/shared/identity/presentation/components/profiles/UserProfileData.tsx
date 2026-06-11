import { ArrowLeft, CreditCard, Loader2, Mail, Pencil, Shield, ShieldAlert, UserCheck, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useChangeUserState } from "@/features/shared/identity/application/hooks";

import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { Badge } from "@/core/components/ui/class-track/Badge";
import { ProfileStatusBadge } from "@/core/components/ui/admin-desk/badges/Badges";
import { userState, type UserState } from "@salc/core/features/shared/identity/domain/entities";

export interface UserProfileDataProps {
    userId: string;
    fullName: string;
    email: string;
    role: string;
    isActive: UserState;
}

export const UserProfileData = ({
    user,
    handleSetEdit,
    canUserResponseEdit,
}: {
    user: UserProfileDataProps;
    handleSetEdit: () => void;
    canUserResponseEdit: boolean;
}) => {
    const navigation = useNavigate();

    const { userId, fullName, role, isActive } = user;

    const handleBack = () => navigation("/admin-desk/view-profiles");

    const { mutate: changeStateUser, isPending } = useChangeUserState();

    const userIsActive = isActive === userState.ACTIVE;

    const handleToggleState = () => changeStateUser(userId);

    return (
        <div className="p-6 space-y-6">
            {/* --- CABECERA (Solo Navegación y Edición) --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-title">Perfil del Usuario</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Información general del usuario</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Button>
                    <Button onClick={handleSetEdit}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                    </Button>
                </div>
            </div>

            {/* --- TARJETA DE PERFIL --- */}
            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden flex flex-col">
                <div className="h-20 bg-primary-foreground" />

                <div className="px-6 pb-6">
                    <div className="flex items-end gap-4 -mt-8 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-accent border-4 border-card flex items-center justify-center flex-shrink-0 shadow-md">
                            <span className="text-accent-foreground text-2xl font-bold">{fullName.charAt(0)}</span>
                        </div>
                        <div className="mb-1">
                            <h2 className="text-xl font-semibold tracking-tight text-foreground">{fullName}</h2>
                            <div className="flex items-center gap-2 mt-1.5">
                                <Badge variant={userIsActive ? "default" : "destructive"} className="px-2 py-0.5 text-xs">
                                    {userIsActive ? "Activo" : "Inactivo"}
                                </Badge>
                                <div className="flex items-center gap-1.5 ml-2">
                                    <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground font-mono">{userId}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 bg-primary/10 rounded-md text-primary shrink-0">
                                <Shield className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs text-muted-foreground">Rol</span>
                                <p className="text-sm font-medium text-foreground">{role}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Correo</p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap">
                        <ProfileStatusBadge status={isActive} />
                    </div>
                </div>

                {/* --- ZONA DE ACCIONES DE CUENTA (Separada e Intuitiva) --- */}
                {canUserResponseEdit && (
                    <div className="mt-auto px-6 py-4 bg-muted/30 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">Acceso al Sistema</h3>
                                <p className="text-xs text-muted-foreground mt-0.5 max-w-md">
                                    {isActive === userState.ACTIVE
                                        ? "Al desactivar la cuenta, este usuario perderá inmediatamente su acceso al sistema."
                                        : "Al activar la cuenta, el usuario podrá volver a iniciar sesión con sus credenciales."}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant={isActive === userState.ACTIVE ? "destructive" : "default"}
                            onClick={handleToggleState}
                            disabled={isPending}
                            className="shrink-0"
                        >
                            {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : isActive === userState.ACTIVE ? (
                                <UserX className="mr-2 h-4 w-4" />
                            ) : (
                                <UserCheck className="mr-2 h-4 w-4" />
                            )}

                            {isPending
                                ? isActive === userState.ACTIVE
                                    ? "Desactivando..."
                                    : "Activando..."
                                : isActive === userState.ACTIVE
                                  ? "Desactivar Cuenta"
                                  : "Activar Cuenta"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
