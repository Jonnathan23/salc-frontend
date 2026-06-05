import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type { UserAuthResponseEntity } from "@salc/core/features/shared/identity/domain/entities";
import { loginUserUseCase } from "@salc/core/features/shared/identity/di/IdentityModule";
import type { BaseLoginFormValues } from "@/features/shared/identity/presentation/interfaces";
import { type SuccessResponse } from "@salc/core/interfaces";
import { LoginMapper } from "@/features/shared/identity/presentation/mappers/login.mapper";

import { CustomError } from "@salc/core/enums";

interface UseLoginUserProps {
    setLoginSession: (userResponse: UserAuthResponseEntity) => void;
}

export const useLoginUser = ({ setLoginSession }: UseLoginUserProps) => {
    const redirect = useNavigate();

    return useMutation<SuccessResponse<UserAuthResponseEntity>, CustomError, BaseLoginFormValues>({
        mutationFn: async (rawData: BaseLoginFormValues) => {
            const validDto = LoginMapper.toLoginDto(rawData);

            const response = await loginUserUseCase.execute(validDto);

            return response;
        },
        onSuccess: (response) => {
            if (!response.data) throw CustomError.badRequest("No se pudo iniciar sesión");

            const user = response.data;

            setLoginSession(user);
            redirect("/");
        },
    });
};
