import type { BaseCheckInFormValues } from "@/features/attendance/presentation/interfaces/BaseAttendanceFormValues.interface";
import { useStartAttendanceSession } from "../use-cases/useStartAttendanceSession.hook";
import { useNavigate } from "react-router-dom";
import { useStudentSessionStore } from "@/core/store/studentSession.store";

export const useCheckIn = () => {
    const navigate = useNavigate();

    const { setEntryTime } = useStudentSessionStore();

    const onSuccessCallback = () => {
        navigate("/dashboard");
    };

    const { mutate, isPending: isSubmitting } = useStartAttendanceSession({ onSuccessCallback, setEntryTime });

    const onSubmit = (formValues: BaseCheckInFormValues) => {
        mutate(formValues);
    };

    return {
        onSubmit,
        isSubmitting,
    };
};
