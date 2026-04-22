import { useQuery } from "@tanstack/react-query";

import { findUserByIdUseCase } from "@salc/core/features/shared/indentity/di/IdentityModule";


export const useFindUserById = (id: string) => {
    return useQuery({
        queryKey: ['user-by-id', id],
        queryFn: () => findUserByIdUseCase.execute(id),
    });
}