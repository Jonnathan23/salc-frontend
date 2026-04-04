import { useNavigate, useParams } from "react-router-dom";

import { useFindUserById } from "@/features/indentity/application/hooks";
import { Loader2 } from "lucide-react";
import { Button } from "@/core/components/buttons/button";

import UpdateUser from "@/features/indentity/presentation/components/register-update/UpdateUser";
import { useMemo, useState } from "react";
import ProfileData from "@/features/indentity/presentation/components/profiles/ProfileData";
import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import { systemPermissions } from "@salc/core/enums/Permissions";




export default function ViewProfilePage() {
    const params = useParams();
    const userId = params.userId!;
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


    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;

    if (isError || !user) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Usuario no encontrado</p>
                <Button onClick={() => navigation('/view-profiles')}>Volver</Button>
            </div>
        )
    }

    if (isEdit && canUserResponseEdit) return <UpdateUser userId={userId} user={user} handleSetEdit={handleSetEdit} />

    return <ProfileData user={user} handleSetEdit={handleSetEdit} canUserResponseEdit={canUserResponseEdit} />
}
