import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import { UserProfileData } from "@/features/shared/identity/presentation/components/profiles/UserProfileData";
import UpdateUser from "@/features/shared/identity/presentation/components/register-update/UpdateUser";
import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { useFindUserById } from "@/features/shared/identity/application/hooks";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { CardGridSkeleton } from "@/core/components/ui/skeletons/CardGridSkeleton";

export default function ViewProfilePage() {
    const parameters = useParams();
    const userId = parameters.userId!;
    const navigation = useNavigate();

    const { userResponse } = useAuthStore();

    const [isEdit, setIsEdit] = useState(false);
    const { data: successResponse, isLoading, isError } = useFindUserById(userId);
    const user = successResponse?.data ? successResponse.data : null;

    const handleSetEdit = () => setIsEdit(!isEdit);

    const canUserResponseEdit = useMemo(() => {
        if (!userResponse) return false;

        return userResponse.permissions.includes(systemPermissions.SHARED_IDENTITY_WRITE);
    }, [userResponse]);

    if (isLoading) return <CardGridSkeleton itemsCount={1} />;

    if (isError || !user) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Usuario no encontrado</p>
                <Button onClick={() => navigation("/view-profiles")}>Volver</Button>
            </div>
        );
    }

    if (isEdit && canUserResponseEdit) return <UpdateUser userId={userId} user={user} handleSetEdit={handleSetEdit} />;

    return <UserProfileData user={user} handleSetEdit={handleSetEdit} canUserResponseEdit={canUserResponseEdit} />;
}
