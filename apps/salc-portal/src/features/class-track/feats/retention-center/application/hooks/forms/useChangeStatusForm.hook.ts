import { useState } from "react";
import type { AlertsResolvedParameters } from "@/features/class-track/feats/retention-center/presentation/interfaces/AlertsHooks.interface";

export const useChangeStatusForm = () => {
    const [retationState, setRetationState] = useState<AlertsResolvedParameters>();

    const handle = () => {
        console.warn("sss");
    };

    return {
        retationState,
        setRetationState,
        handle,
    };
};
