import { useMutation } from "@tanstack/react-query"
import type { UseFormReset } from "react-hook-form"
import type { Dispatch, SetStateAction } from "react"

import { RegisterStudentDtoImpl, type RegisterStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos"
import { registerStudentUseCase } from "@salc/core/features/admin-desk/students/di/StudentModule"
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter"


interface UseRegisterStudentProps {
    setSubmitSuccess: Dispatch<SetStateAction<boolean>>
    reset: UseFormReset<RegisterStudentDto>
}

export const useRegisterStudent = ({ setSubmitSuccess, reset }: UseRegisterStudentProps) => {

    return useMutation({
        mutationFn: async (data: RegisterStudentDto) => {
           const validData = RegisterStudentDtoImpl.create(data);

           const response = await registerStudentUseCase.execute(validData);

           return response;
        },
        onSuccess(data) {
            ShowMessageAdapter.success(data.message);
            setSubmitSuccess(true);
            reset();
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);
        }
    })
}