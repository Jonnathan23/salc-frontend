import { useState, useEffect } from "react";
import { useForm } from "react-hook-Form";

import type { BaseUpdateStudentLevelFormValues } from "@/features/admin-desk/students-levels/presentation/interfaces/BaseStudentLevelFormValues.interface";
import { StudentLevelFormMapper } from "@/features/admin-desk/students-levels/presentation/mappers/StudentLevelFormMapper";
import { useUpdateStudentLevel } from "@/features/admin-desk/students-levels/application/hooks/use-cases/useUpdateStudentLevel.use";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";

interface UseUpdateStudentLevelFormProps {
    initialData?: StudentLevelEntity;
}

export const useUpdateStudentLevelForm = ({ initialData }: UseUpdateStudentLevelFormProps = {}) => {
    // Estado local para manejar el éxito visual en la UI
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const defaultValues: BaseUpdateStudentLevelFormValues = {
        contractId: "",
        studentId: "",
        status: "",
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<BaseUpdateStudentLevelFormValues>({
        defaultValues,
    });

    // TODO: quitar el  Mapeo inverso: Precargar datos si se pasa initialData
    useEffect(() => {
        if (initialData) {
            const mappedValues = StudentLevelFormMapper.toBaseFormValues(initialData);

            reset(mappedValues);
        }
    }, [initialData, reset]);

    const handleSuccess = () => {
        setSubmitSuccess(true);

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 3000);
    };

    const { mutate: updateStudentLevelMutation, isPending: isSubmitting } = useUpdateStudentLevel({ handleSuccess });

    const onSubmit = (formData: BaseUpdateStudentLevelFormValues) => {
        updateStudentLevelMutation(formData);
    };

    return {
        submitSuccess,
        errors,
        control,
        handleSubmit,
        register,
        onSubmit,
        isSubmitting,
    };
};
