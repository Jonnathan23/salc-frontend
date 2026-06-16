import { useEffect } from "react";

import { useStudentSessionStore } from "@/core/store/studentSession.store";
import { useVerifyStudent } from "@/features/shared/verify/application/hooks/use-cases/useVerifyStudent.hook";

export const useSessionStudent = () => {
    const { setLoginSession, setLogoutSession } = useStudentSessionStore();

    const query = useVerifyStudent();

    useEffect(() => {
        if (query.isSuccess && query.data?.data) {
            setLoginSession(query.data.data);
        }

        if (query.isError) {
            setLogoutSession();
        }
    }, [query.isSuccess, query.isError, query.data, setLoginSession, setLogoutSession]);

    return query;
};
