import { useQuery } from "@tanstack/react-query"
import { getAllModulesUseCase } from "@salc/core/features/admin-desk/modules/di/ModuleModule";


export const useGetAllModules = () => {

    return useQuery({
        queryKey: ["modules"],
        queryFn: () => getAllModulesUseCase.execute()
    });
}