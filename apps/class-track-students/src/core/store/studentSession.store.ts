import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import type { StudentTokenPayloadEntity } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";

interface StudentSessionState {
    studentResponse: StudentTokenPayloadEntity | null;
    entryTime: string | null;
    hasCreatedLessonLogs: boolean;
    isAuthenticated: boolean;
    setLoginSession: (studentResponse: StudentTokenPayloadEntity) => void;
    setEntryTime: (time: string) => void;
    setHasCreatedLessonLogs: (status: boolean) => void;
    setLogoutSession: () => void;
}

export const useStudentSessionStore = create<StudentSessionState>()(
    devtools(
        persist(
            (set) => ({
                studentResponse: null,
                entryTime: null,
                hasCreatedLessonLogs: false,
                isAuthenticated: false,

                setLoginSession: (studentResponse) => {
                    set({
                        studentResponse: studentResponse,
                        isAuthenticated: true,
                    });
                },

                setEntryTime: (time) => {
                    set({
                        entryTime: time,
                    });
                },

                setHasCreatedLessonLogs: (status) => {
                    set({
                        hasCreatedLessonLogs: status,
                    });
                },

                setLogoutSession: () => {
                    set({
                        studentResponse: null,
                        entryTime: null,
                        hasCreatedLessonLogs: false,
                        isAuthenticated: false,
                    });
                },
            }),
            {
                name: "student-session-storage",
                storage: createJSONStorage(() => sessionStorage),
            },
        ),
    ),
);
