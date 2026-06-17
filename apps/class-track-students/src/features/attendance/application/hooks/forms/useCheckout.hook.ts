import { useEndAttendanceSession } from "@/features/attendance/application/hooks/use-cases/useEndAttendanceSession.hook";
import { useStudentSessionStore } from "@/core/store/studentSession.store";

export const useCheckout = () => {
    const setLogoutSession = useStudentSessionStore((state) => state.setLogoutSession);

    const onSuccessCallback = () => {
        // Redirigir o limpiar estado si es necesario
    };

    const { mutate: endSessionMutation, isPending: isSubmitting } = useEndAttendanceSession({
        onSuccessCallback,
        setLogoutSession,
    });

    const onSubmit = (sessionId: string) => {
        if (!sessionId) return;

        endSessionMutation({ sessionId });
    };

    return {
        onSubmit,
        isSubmitting,
    };
};
