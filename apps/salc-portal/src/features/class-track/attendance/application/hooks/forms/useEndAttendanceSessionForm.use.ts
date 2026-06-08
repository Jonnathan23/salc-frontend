import { useEndAttendanceSession } from "@/features/class-track/attendance/application/hooks/use-cases/useEndAttendanceSession.use";
import type { BaseEndSessionFormValues } from "@/features/class-track/attendance/presentation/interfaces/BaseEndSessionFormValues.interface";
import { useForm } from "react-hook-form";

export const useEndAttendanceSessionForm = () => {
    const defaultValues: BaseEndSessionFormValues = {
        sessionId: "",
        teacherId: "",
        exitTime: new Date(),
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<BaseEndSessionFormValues>({
        defaultValues,
    });

    const { mutate: endSessionMutation, isPending: isSubmitting } = useEndAttendanceSession({ reset });

    const onSubmit = (formData: BaseEndSessionFormValues) => {
        endSessionMutation(formData);
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
