import { useQuery } from "@tanstack/react-query";
import { verifyStudentUseCase } from "@salc/core/features/shared/verify/di/VerifyModule";

export const useVerifyStudent = () => {
    return useQuery({
        queryKey: ["verify-student"],
        queryFn: async () => {
            return await verifyStudentUseCase.execute();
        },
        retry: false,
    });
};
