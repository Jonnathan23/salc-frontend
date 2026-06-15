import type { BaseCheckInFormValues } from "@/features/attendance/presentation/interfaces/BaseAttendanceFormValues.interface";
import { useStartAttendanceSession } from "../use-cases/useStartAttendanceSession.hook";
import { useNavigate } from "react-router-dom";

export const useCheckIn = () => {
    const navigate = useNavigate();

    const onSuccessCallback = () => {
        navigate("/dashboard");
    };

    const { mutate, isPending: isSubmitting } = useStartAttendanceSession({ onSuccessCallback });

    const onSubmit = (formValues: BaseCheckInFormValues) => {
        mutate(formValues);
    };

    return {
        onSubmit,
        isSubmitting,
    };
};
