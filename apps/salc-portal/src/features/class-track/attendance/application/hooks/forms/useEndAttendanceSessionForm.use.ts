import { useEndAttendanceSession } from "@/features/class-track/attendance/application/hooks/use-cases/useEndAttendanceSession.use";
import type { BaseEndSessionFormValues } from "@/features/class-track/attendance/presentation/interfaces/BaseEndSessionFormValues.interface";
import { useState } from "react";

export const useEndAttendanceSessionForm = () => {
    const [errorForm, setErrorForm] = useState<string>("");

    const verify = (checkInForm: BaseEndSessionFormValues) => {
        if (!checkInForm.sessionId) {
            setErrorForm("Debe ingresar el codigo de sesion");

            return false;
        }
        if (!checkInForm.teacherId) {
            setErrorForm("Debe ingresar el codigo de profesor");

            return false;
        }
        if (!checkInForm.exitTime) {
            setErrorForm("Debe ingresar la fecha de salida");

            return false;
        }
        setErrorForm("");

        return true;
    };

    const { mutate: endSessionMutation, isPending: isSubmitting } = useEndAttendanceSession();

    const onSubmit = (student: BaseEndSessionFormValues) => {
        const isValid = verify(student);

        if (!isValid) return;

        endSessionMutation(student);
    };

    return {
        isSubmitting,
        errorForm,
        onSubmit,
    };
};
