import { useState } from "react";
import { useForm } from "react-hook-form";
import type { BaseStudentLevelFormValues } from "@/features/admin-desk/students-levels/presentation/interfaces/BaseStudentLevelFormValues.interface";
import { usePurchaseModules } from "@/features/admin-desk/students-levels/application/hooks/use-cases/usePurchaseModules.use";

export const usePurchaseModulesForm = () => {
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const defaultValues: BaseStudentLevelFormValues = {
        studentId: "",
        sellerId: "",
        moduleIds: [],
        //contractId: '',
        //status: ''
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<BaseStudentLevelFormValues>({
        defaultValues,
    });

    const handleSuccess = () => {
        setSubmitSuccess(true);
        reset();

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 3000);
    };

    const { mutate: purchaseModulesMutation, isPending: isSubmitting } = usePurchaseModules({ handleSuccess });

    const onSubmit = (formData: BaseStudentLevelFormValues) => {
        purchaseModulesMutation(formData);
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
