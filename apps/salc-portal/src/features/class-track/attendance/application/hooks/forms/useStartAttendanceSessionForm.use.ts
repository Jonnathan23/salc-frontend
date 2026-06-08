import { useForm } from "react-hook-form";

import type { BaseStartSessionFormValues } from "@/features/class-track/attendance/presentation/interfaces/BaseStartSessionFormValues.interface";
import { useStartAttendanceSession } from "@/features/class-track/attendance/application/hooks/use-cases/useStartAttendanceSession.use";

export const useStartAttendanceSessionForm = () => {
    const defaultValues: BaseStartSessionFormValues = {
        studentId: "",
        entryTime: new Date(),
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<BaseStartSessionFormValues>({
        defaultValues,
    });

    const { mutate: startSessionMutation, isPending: isSubmitting } = useStartAttendanceSession({ reset });

    const onSubmit = (formData: BaseStartSessionFormValues) => {
        startSessionMutation(formData);
    };

    return {
        errors,
        control,
        handleSubmit,
        register,
        onSubmit,
        isSubmitting,
    };
};
