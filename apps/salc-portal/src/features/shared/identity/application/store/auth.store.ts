import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/identity/domain/entities";


interface AuthState {
    userResponse: UserAuthResponseEntity | null;
    isAuthenticated: boolean;
    setLoginSession: (userResponse: UserAuthResponseEntity) => void;
    setLogoutSession: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                userResponse: null,
                isAuthenticated: false,

                setLoginSession: (userResponse) => {
                    set({
                        userResponse: userResponse,
                        isAuthenticated: true
                    });
                },

                setLogoutSession: () => {
                    set({
                        userResponse: null,
                        isAuthenticated: false
                    });
                }
            }),
            {
                name: 'auth-storage',
                /* * Almacenamos el perfil del usuario (rol, nombre, permisos) para que 
                 * React pueda renderizar inmediatamente después de un F5 sin FOUC 
                 * (Flash Of Unauthenticated Content). El token real viaja en la cookie.
                 */
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);