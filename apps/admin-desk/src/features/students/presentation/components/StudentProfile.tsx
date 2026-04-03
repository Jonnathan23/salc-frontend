import { Button } from "@/core/components/buttons/button";
import { useSearchStudent } from "@/features/students/application/hooks";
import StudentProfileViewData from "@/features/students/presentation/components/StudentProfileViewData";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";



export default function StudentProfile() {

    const params = useParams();
    const studentId = params.studentId!;
    const navigation = useNavigate();

    const { data: successResponse, isLoading, isError } = useSearchStudent(studentId);
    const student = successResponse?.data ? successResponse.data[0] : null;

    if (isLoading) {
        return <Loader2 className="w-4 h-4 animate-spin" />;
    }

    if (isError) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-[var(--color-font)]/50 text-sm mt-0.5">Estudiante no encontrado</p>
                <Button onClick={() => navigation('/view-students')}>Volver</Button>
            </div>
        )
    }

    if (student) return (
        <StudentProfileViewData student={student} />
    );
}
