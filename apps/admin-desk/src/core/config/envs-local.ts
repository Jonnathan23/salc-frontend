import { useAuthStore } from '@/features/indentity/application/store/auth.store';
import { loadEnvs } from '@salc/core/config';
import { setupApiClient } from '@salc/core/lib';

export const envsLocal = {
    CLASS_TRACK_URL: import.meta.env.VITE_CLASS_TRACK_URL
}

export const loadCoreEnvs = () => {
    loadEnvs({
        API_URL: import.meta.env.VITE_API_URL,
    });

    const onUnauthorized = useAuthStore.getState().setLogoutSession
    setupApiClient(onUnauthorized);
}