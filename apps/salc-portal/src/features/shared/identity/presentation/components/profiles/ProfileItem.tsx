import { useNavigate } from "react-router-dom";

import type { UserAuthResponseEntity } from "@salc/core/features/shared/identity/domain/entities";
import { ProfileStatusBadge } from "@/core/components/ui/admin-desk/badges/Badges";

interface ProfileItemProps {
    user: UserAuthResponseEntity;
}

export default function ProfileItem({ user }: ProfileItemProps) {
    const { fullName, userId, role, isActive } = user;

    const navigation = useNavigate();

    const handleViewStudent = (userId: string) => {
        navigation(`/view-profiles/${userId}/profile`);
    };

    return (
        <tr
            key={userId}
            className="hover:bg-primary/10 transition-colors cursor-pointer"
            onClick={() => handleViewStudent(userId)}
        >
            <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className=" w-7 h-7 rounded-full bg-primary-foreground flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{fullName.charAt(0)}</span>
                    </div>

                    <span className="font-medium text-foreground">{fullName}</span>
                </div>
            </td>
            <td className="px-5 py-3 text-foreground/70">{role}</td>
            <td className="px-5 py-3">
                <ProfileStatusBadge status={isActive} />
            </td>
        </tr>
    );
}
