import { useState } from "react";
import { useForm } from "react-hook-Form";
import { useUpdateStudent } from "@/features/admin-desk/students/application/hooks/use-cases/useUpdateStudent.use";
import type { BaseStudentFormValues } from "@/features/admin-desk/students/presentation/interfaces";
import {
    certificateType,
    type CertificateType,
} from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";

interface UpdateStudentFormProps {
    defaultValues: BaseStudentFormValues;
    id: string;
}

export const useUpdateStudentForm = ({ defaultValues, id }: UpdateStudentFormProps) => {
    // Constants
    const certificates: CertificateType[] = [certificateType.ONE_TONNE, certificateType.TOEFL, certificateType.OTHER];

    const minimumStudentAge = 4;
    const minimumAllowedDate = new Date();

    minimumAllowedDate.setFullYear(minimumAllowedDate.getFullYear() - minimumStudentAge);

    const currentDate = new Date();
    const maximumAllowedDate = new Date(
        currentDate.getFullYear() - minimumStudentAge,
        currentDate.getMonth(),
        currentDate.getDate(),
    );

    // States
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Hooks
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<BaseStudentFormValues>({ defaultValues });

    // Handlers
    const handleSuccess = () => {
        setSubmitSuccess(true);
        setTimeout(() => {
            setSubmitSuccess(false);
        }, 3000);
    };

    // Mutations
    const { mutate: updateStudentMutation, isPending: isSubmitting } = useUpdateStudent({ handleSuccess });

    //* Form Handler
    const onSubmit = (formData: BaseStudentFormValues) => {
        updateStudentMutation({ id, data: formData });
    };

    return {
        submitSuccess,
        errors,
        control,
        handleSubmit,
        updateStudentMutation,
        register,
        onSubmit,
        isSubmitting,
        maxAllowedDate: maximumAllowedDate,
        minDate: minimumAllowedDate,
        certificates,
    };
};
