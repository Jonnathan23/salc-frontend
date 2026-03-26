import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { CustomError } from '@salc/core/enums';
import { ShowMessageAdapter } from '../adapters/ShowMessageAdapter';

export const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
        queryCache: new QueryCache({
            onError: (error) => {
                if (error instanceof CustomError) {
                    const errorMessage = error.errors[0]?.message || 'Error en la consulta';
                    ShowMessageAdapter.error(errorMessage);
                    return;
                }

                ShowMessageAdapter.error('Ocurrió un error inesperado');

            }
        }),
        mutationCache: new MutationCache({
            onError: (error) => {
                if (error instanceof CustomError) {
                    const errorMessage = error.errors[0]?.message || 'Ocurrió un error inesperado';
                    ShowMessageAdapter.error(errorMessage);
                    return;
                }

                ShowMessageAdapter.error('Ocurrió un error inesperado');
            }
        })
    });
}