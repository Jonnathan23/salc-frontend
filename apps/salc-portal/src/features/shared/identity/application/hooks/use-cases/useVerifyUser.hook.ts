import { useQuery } from "@tanstack/react-query";
import { verifyUserUseCase } from "@salc/core/features/shared/verify/di/VerifyModule";
import type { SuccessResponse } from "@salc/core/interfaces";
import type { UserTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/UserTokenPayload.model";
import { CustomError } from "@salc/core/enums";

export const useVerifyUser = (enabled: boolean = true) => {
    return useQuery<SuccessResponse<UserTokenPayloadEntity>, CustomError>({
        queryKey: ["verifyUser"],
        queryFn: async () => {
            return await verifyUserUseCase.execute();
        },
        retry: false,
        staleTime: Infinity,
        refetchOnMount: "always",
        refetchOnWindowFocus: "always",
        refetchOnReconnect: true,
        enabled,
    });
};
