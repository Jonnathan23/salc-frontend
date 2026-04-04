import { useNavigate, useParams } from "react-router-dom";

import { useFindUserById } from "@/features/indentity/application/hooks";
import { Loader2 } from "lucide-react";
import { Button } from "@/core/components/buttons/button";

import UpdateUser from "../components/register-update/UpdateUser";
import { useState } from "react";
import ProfileData from "../components/profiles/ProfileData";

export default function ViewProfilePage() {
    const params = useParams();
    const userId = params.userId!;
    const navigation = useNavigate();

    const [isEdit, setIsEdit] = useState(false);
    const { data: successResponse, isLoading, isError } = useFindUserById(userId);
    const user = successResponse?.data ? successResponse.data : null;

    const handleSetEdit = () => setIsEdit(!isEdit);


    if (isLoading) {
        return <Loader2 className="w-4 h-4 animate-spin" />;
    }

    if (isError || !user) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Usuario no encontrado</p>
                <Button onClick={() => navigation('/view-profiles')}>Volver</Button>
            </div>
        )
    }

    if (isEdit) return <UpdateUser userId={userId} user={user} handleSetEdit={handleSetEdit} />

    return <ProfileData user={user} handleSetEdit={handleSetEdit} />

}
