import { useMutation } from "@tanstack/react-query"
import { useNavigate, type NavigateFunction } from "react-router-dom";

import { loginUserUseCase } from "@salc/core/features/shared/indentiy/di/IdentityModule";
import { LoginUserDtoImpl, type LoginUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { userRoles, type SuccessResponse, type UserRoles } from "@salc/core/interfaces";
import { envsLocal } from "@/core/config/envs-local";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentiy/domain/entities";
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

    return useMutation<SuccessResponse<UserAuthResponseEntity>, CustomError, LoginUserDto>({
        mutationFn: async (rawData: LoginUserDto) => {
            const validDto = LoginUserDtoImpl.create(rawData);

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