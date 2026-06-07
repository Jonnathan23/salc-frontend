import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { ContractStatusBadge, ProgressCategoryBadge } from "@/core/components/ui/admin-desk/badges/Badges";
import { useNavigate } from "react-router-dom";

interface StudentItemProps {
    student: StudentEntity;
}

export default function StudentItem({ student }: StudentItemProps) {
    const { fullName, identificationCard, certificateType, contractStatus, progressCategory, id } = student;

    const navigation = useNavigate();

    const handleViewStudent = (studentId: string) => {
        navigation(`/view-students/${studentId}/profile`);
    };

    return (
        <tr key={id} className="hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => handleViewStudent(id)}>
            <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className=" w-7 h-7 rounded-full bg-primary-foreground flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{fullName.charAt(0)}</span>
                    </div>

                    <span className="font-medium text-foreground">{fullName}</span>
                </div>
            </td>
            <td className="px-5 py-3 text-foreground/60 font-mono text-xs">{identificationCard}</td>
            <td className="px-5 py-3 text-foreground/70">{certificateType}</td>
            <td className="px-5 py-3">
                <ContractStatusBadge status={contractStatus} />
            </td>
            <td className="px-5 py-3">
                <ProgressCategoryBadge category={progressCategory} />
            </td>
        </tr>
    );
}
