import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateStudentLevel } from "../use-cases/useUpdateStudentLevel.use";
import type { BaseStudentLevelFormValues } from "../../../presentation/interfaces/BaseStudentLevelFormValues.interface";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import { StudentLevelFormMapper } from "../../../presentation/mappers/StudentLevelFormMapper";

interface UseUpdateStudentLevelFormProps {
    initialData?: StudentLevelEntity;
}

export const useUpdateStudentLevelForm = ({ initialData }: UseUpdateStudentLevelFormProps = {}) => {
    // Estado local para manejar el éxito visual en la UI
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const defaultValues: BaseStudentLevelFormValues = {
        studentId: '',
        sellerId: '',
        moduleIds: [],
        contractId: '',
        status: ''
    };

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<BaseStudentLevelFormValues>({
        defaultValues
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

    const onSubmit = (formData: BaseStudentLevelFormValues) => {
        updateStudentLevelMutation(formData);
    };

    return {
        submitSuccess,
        errors,
        control,
        handleSubmit,
        register,
        onSubmit,
        isSubmitting
    };
};
