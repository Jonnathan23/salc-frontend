import { useApproveAttendanceSession } from "@/features/class-track/feats/attendance/application/hooks/use-cases/useApproveAttendanceSession.use";
import type { BaseApproveSessionFormValues } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseApproveSessionFormValues.interface";
import { useState } from "react";

export const useApproveAttendanceSessionForm = () => {
    const [errorForm, setErrorForm] = useState<string>("");

    const verify = (form: BaseApproveSessionFormValues) => {
        if (!form.sessionId) {
            setErrorForm("Debe proporcionar un código de sesión");

            return false;
        }
        setErrorForm("");

        return true;
    };

    const { mutate: approveSessionMutation, isPending: isSubmittingApprove } = useApproveAttendanceSession();

    const onSubmitApprove = (form: BaseApproveSessionFormValues) => {
        const isValid = verify(form);

        if (!isValid) return;

        approveSessionMutation(form);
    };

    return {
        isSubmittingApprove,
        errorForm,
        onSubmitApprove,
    };
};
