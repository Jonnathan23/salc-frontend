import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"

import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentity/domain/entities";
import { loginUserUseCase } from "@salc/core/features/shared/indentity/di/IdentityModule";
import type { BaseLoginFormValues } from "@/features/indentity/presentation/interfaces";
import { userRoles, type SuccessResponse, type UserRoles } from "@salc/core/interfaces";
import { LoginMapper } from "@/features/indentity/presentation/mappers/login.mapper";
import { envsLocal } from "@/core/config/envs-local";
import { CustomError } from "@salc/core/enums";

const urlClassTrack = envsLocal.CLASS_TRACK_URL;

const usersRedirectionMap: Record<UserRoles, (redirect: NavigateFunction) => void> = {
    // Admin Desk
    [userRoles.ADMIN]: (redirect: NavigateFunction) => redirect('/'),
    [userRoles.ADVISOR]: (redirect: NavigateFunction) => redirect('/'),

    // Class Track (Salto a otra app)
    [userRoles.TEACHER]: () => { window.location.href = urlClassTrack; },
    [userRoles.ACADEMIC_DIRECTOR]: () => { window.location.href = urlClassTrack; },
};

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
            if (!response.data) throw CustomError.badRequest('No se pudo iniciar sesión');

            const user = response.data;
            const role = user.us_role;

            setLoginSession(user);
            usersRedirectionMap[role](redirect);
        }
    });
};