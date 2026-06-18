import { BookOpen } from "lucide-react";
import { useGetAllUsers } from "@/features/shared/identity/application/hooks/use-cases/useGetAllUsers.use";
import ProfileItem from "@/features/shared/identity/presentation/components/profiles/ProfileItem";
import { StudentItemSkeleton } from "@/core/components/ui/skeletons/StudentItemSkeleton";

export default function DirectoryProfilesPage() {
    const { data: successResponse, isLoading } = useGetAllUsers();
    const users = successResponse?.data ?? [];

    return (
        <div className="bg-card text-card-foreground rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-title" />
                <h2 className="font-semibold text-title text-sm">Directorio de Usuarios</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-primary/20">
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Usuario
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Rol
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {isLoading ? (
                            <StudentItemSkeleton numbersRows={4} />
                        ) : (
                            users.map((user) => <ProfileItem key={user.userId} user={user} />)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
