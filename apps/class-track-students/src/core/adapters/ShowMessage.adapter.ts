import { toast, type Id, type TypeOptions } from "react-toastify";

export const ShowMessageAdapter = {
    success(message: string): Id {
        return toast.success(message);
    },

    error(message: string): Id {
        return toast.error(message);
    },

    warning(message: string): Id {
        return toast.warning(message);
    },

    info(message: string): Id {
        return toast.info(message);
    },

    loading(message: string): Id {
        return toast.loading(message);
    },

    updateToast(toastId: Id, message: string, type: TypeOptions) {
        toast.update(toastId, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: 3000,
        });
    },

    closeToast(toastId: Id) {
        toast.dismiss(toastId);
    },
};
