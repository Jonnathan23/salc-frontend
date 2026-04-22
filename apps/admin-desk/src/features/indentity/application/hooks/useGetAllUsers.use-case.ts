import { useQuery } from "@tanstack/react-query";
import { getAllUsersUseCase } from "@salc/core/features/shared/indentity/di/IdentityModule";


export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getAllUsersUseCase.execute()
    });
}