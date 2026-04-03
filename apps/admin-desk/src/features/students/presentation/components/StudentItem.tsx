
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { ContractStatusBadge, ProgressCategoryBadge } from "@/core/components/badges/Badges";


interface StudentItemProps {
    student: StudentEntity;
}

export default function StudentItem({ student }: StudentItemProps) {
    return (

        <tr key={student.id} className="hover:bg-primary/10 transition-colors">
            <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary-foreground flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">
                            {student.fullName.charAt(0)}
                        </span>
                    </div>

                    <span className="font-medium text-foreground">
                        {student.fullName}
                    </span>
                </div>
            </td>
            <td className="px-5 py-3 text-foreground/60 font-mono text-xs">
                {student.identificationCard}
            </td>
            <td className="px-5 py-3 text-foreground/70">
                {student.certificateType}
            </td>
            <td className="px-5 py-3">
                <ContractStatusBadge status={student.contractStatus} />
            </td>
            <td className="px-5 py-3">
                <ProgressCategoryBadge category={student.progressCategory} />
            </td>
        </tr>

    );
}
