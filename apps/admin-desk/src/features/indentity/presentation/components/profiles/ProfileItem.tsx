import { useNavigate } from "react-router-dom";

import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentity/domain/entities";
import { ProfileStatusBadge } from "@/core/components/badges/Badges";





interface ProfileItemProps {
    user: UserAuthResponseEntity;
}

export default function ProfileItem({ user }: ProfileItemProps) {

    const { us_full_name, us_id, us_role, us_is_active } = user;

    const navigation = useNavigate();

    const handleViewStudent = (userId: string) => {
        navigation(`/view-profiles/${userId}/profile`);
    };

    return (

        <tr key={us_id} className="hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => handleViewStudent(us_id)}>
            <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className=" w-7 h-7 rounded-full bg-primary-foreground flex items-center justify-center flex-shrink-0" >
                        <span className="text-white text-xs font-bold">
                            {us_full_name.charAt(0)}
                        </span>
                    </div>

                    <span className="font-medium text-foreground">
                        {us_full_name}
                    </span>
                </div>
            </td>
            <td className="px-5 py-3 text-foreground/70">
                {us_role}
            </td>
            <td className="px-5 py-3">
                <ProfileStatusBadge status={us_is_active} />
            </td>
        </tr>

    );
}
