import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { loadEnvs } from "@salc/core/config";
import { clientContextValues } from "@salc/core/enums/ClientContext";
import { setupApiClient } from "@salc/core/lib";

export const envsLocal = {
    CLASS_TRACK_URL: import.meta.env.VITE_CLASS_TRACK_URL,
};

export const loadCoreEnvs = () => {
    loadEnvs({
        API_URL: import.meta.env.VITE_API_URL,
    });

    const onUnauthorized = useAuthStore.getState().setLogoutSession;

    setupApiClient(onUnauthorized, clientContextValues.salcPortal);
};
