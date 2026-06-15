import { useState } from "react";
import { useEndAttendanceSession } from "../use-cases/useEndAttendanceSession.hook";

export const useCheckout = () => {
    const [sessionId, setSessionId] = useState<string>("");

    const onSuccessCallback = () => {
        setSessionId("");
    };

    const { mutate: endSessionMutation, isPending: isSubmitting } = useEndAttendanceSession({ onSuccessCallback });

    const onSubmit = () => {
        if (!sessionId) return;

        endSessionMutation({ sessionId });
    };

    return {
        sessionId,
        setSessionId,
        onSubmit,
        isSubmitting,
    };
};
