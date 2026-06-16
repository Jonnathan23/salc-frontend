import { useEndAttendanceSession } from "@/features/attendance/application/hooks/use-cases/useEndAttendanceSession.hook";

export const useCheckout = () => {
    const onSuccessCallback = () => {
        // Redirigir o limpiar estado si es necesario
    };

    const { mutate: endSessionMutation, isPending: isSubmitting } = useEndAttendanceSession({ onSuccessCallback });

    const onSubmit = (sessionId: string) => {
        if (!sessionId) return;

        endSessionMutation({ sessionId });
    };

    return {
        onSubmit,
        isSubmitting,
    };
};
