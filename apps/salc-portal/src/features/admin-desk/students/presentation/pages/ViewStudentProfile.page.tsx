import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { useSearchStudent } from "@/features/admin-desk/students/application/hooks";
import UpdateStudent from "@/features/admin-desk/students/presentation/components/register-update/UpdateStudent";
import StudentProfileData from "@/features/admin-desk/students/presentation/components/student-item/StudentProfileData";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewStudentProfile() {
    const parameters = useParams();
    const studentId = parameters.studentId!;
    const navigation = useNavigate();

    const { userResponse } = useAuthStore();
    const { data: successResponse, isLoading, isError } = useSearchStudent(studentId);

    const student = successResponse?.data?.[0] ? successResponse.data[0] : null;

    const [isEdit, setIsEdit] = useState(false);

    const canUserResponseEdit = useMemo(() => {
        if (!userResponse) return false;

        return userResponse.permissions.includes(systemPermissions.ADMINDESK_STUDENTS_WRITE);
    }, [userResponse]);

    const handleSetEdit = () => {
        setIsEdit(!isEdit);
    };

    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;

    if (isError || !student || !userResponse) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Usuario no encontrado</p>
                <Button onClick={() => navigation("/view-profiles")}>Volver</Button>
            </div>
        );
    }

    if (isEdit && canUserResponseEdit)
        return (
            <UpdateStudent
                studentId={studentId}
                student={student}
                assignedSeller={userResponse.fullName || "No asignado"}
                handleSetEdit={handleSetEdit}
            />
        );

    return <StudentProfileData student={student} handleSetEdit={handleSetEdit} />;
}
