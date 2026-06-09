import { useState } from "react";

import type { BaseStartSessionFormValues } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseStartSessionFormValues.interface";
import { useStartAttendanceSession } from "@/features/class-track/feats/attendance/application/hooks/use-cases/useStartAttendanceSession.use";

export const useStartAttendanceSessionForm = () => {
    const defaultValues: BaseStartSessionFormValues = {
        studentId: "",
        entryTime: new Date(),
    };

    const [startForm, setStartForm] = useState<BaseStartSessionFormValues>(defaultValues);
    const [errorStartForm, setErrorStartForm] = useState<string>("");

    const verify = (startForm: BaseStartSessionFormValues) => {
        if (!startForm.studentId) {
            setErrorStartForm("Debe ingresar el codigo de estudiante");

            return false;
        }
        if (!startForm.entryTime) {
            setErrorStartForm("Debe ingresar la fecha de entrada");

            return false;
        }
        setErrorStartForm("");

        return true;
    };

    const handleSetStudentId = (studentId: string) => {
        setStartForm((prev) => ({ ...prev, studentId }));
    };

    const handleSetEntryTime = (entryTime: string) => {
        const entryDate = new Date(entryTime);

        setStartForm((prev) => ({ ...prev, entryTime: entryDate }));
    };

    const handleReset = () => {
        setStartForm(defaultValues);
    };

    const { mutate: startSessionMutation, isPending: isSubmittingStartForm } = useStartAttendanceSession({ reset: handleReset });

    const onSubmitStartForm = () => {
        const isValid = verify(startForm);

        if (!isValid) return;
        startSessionMutation(startForm);
    };

    return {
        startForm,
        errorStartForm,
        isSubmittingStartForm,
        onSubmitStartForm,
        handleSetStudentId,
        handleSetEntryTime,
    };
};
