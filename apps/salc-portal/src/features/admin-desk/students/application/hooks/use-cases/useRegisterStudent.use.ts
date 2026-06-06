import { useMutation } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-Form";
import type { Dispatch, SetStateAction } from "react";

import { registerStudentUseCase } from "@salc/core/features/admin-desk/students/di/StudentModule";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import type { BaseStudentFormValues } from "@/features/admin-desk/students/presentation/interfaces";
import { StudentFormMapper } from "@/features/admin-desk/students/presentation/mappers/StudentForm.mapper";

interface UseRegisterStudentProps {
    setSubmitSuccess: Dispatch<SetStateAction<boolean>>;
    reset: UseFormReset<BaseStudentFormValues>;
}

export const useRegisterStudent = ({ setSubmitSuccess, reset }: UseRegisterStudentProps) => {
    return useMutation({
        mutationFn: async (data: BaseStudentFormValues) => {
            const validData = StudentFormMapper.toRegisterDto(data);
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
        },
    });
};
