import { ArrowLeft, BookOpen, CreditCard, Loader2, Mail, Pencil, ShieldAlert, UserCheck, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useChangeUserState } from "@/features/shared/identity/application/hooks";

import { Button } from "@/core/components/admin-desk/buttons/Button";
import { ProfileStatusBadge } from "@/core/components/admin-desk/badges/Badges";
import { userState, type UserState } from "@salc/core/features/shared/identity/domain/entities";

interface UserAuthResponseEntity {
    us_id: string;
    us_full_name: string;
    us_email: string;
    us_role: string;
    us_is_active: UserState; // Tipado estricto con la nueva interfaz
}

interface ProfileDataProps {
    user: UserAuthResponseEntity;
    handleSetEdit: () => void;
    canUserResponseEdit: boolean;
}

export default function UserProfileData({ user, handleSetEdit, canUserResponseEdit }: ProfileDataProps) {
    const navigation = useNavigate();

    const { us_id, us_full_name, us_email, us_role, us_is_active } = user;

    const handleBack = () => navigation("/view-profiles");

    const { mutate: changeStateUser, isPending } = useChangeUserState();

    const handleToggleState = () => changeStateUser(us_id);

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
                            <span className="text-accent-foreground text-2xl font-bold">{us_full_name.charAt(0)}</span>
                        </div>
                        <div className="mb-1">
                            <h2 className="text-xl font-bold text-foreground leading-tight">{us_full_name}</h2>
                            <div className="flex items-center gap-1.5 mt-1">
                                <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground font-mono">{us_id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Role</p>
                                <p className="text-sm font-medium text-foreground">{us_role}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Correo</p>
                                <p className="text-sm font-medium text-foreground truncate">{us_email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap">
                        <ProfileStatusBadge status={us_is_active} />
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
                                    {us_is_active === userState.ACTIVE
                                        ? "Al desactivar la cuenta, este usuario perderá inmediatamente su acceso al sistema."
                                        : "Al activar la cuenta, el usuario podrá volver a iniciar sesión con sus credenciales."}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant={us_is_active === userState.ACTIVE ? "destructive" : "default"}
                            onClick={handleToggleState}
                            disabled={isPending}
                            className="shrink-0"
                        >
                            {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : us_is_active === userState.ACTIVE ? (
                                <UserX className="mr-2 h-4 w-4" />
                            ) : (
                                <UserCheck className="mr-2 h-4 w-4" />
                            )}

                            {isPending
                                ? us_is_active === userState.ACTIVE
                                    ? "Desactivando..."
                                    : "Activando..."
                                : us_is_active === userState.ACTIVE
                                  ? "Desactivar Cuenta"
                                  : "Activar Cuenta"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
