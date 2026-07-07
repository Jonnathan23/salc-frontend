import { toast, type Id, type TypeOptions } from "react-toastify";

export class ShowMessageAdapter {
    public static success(message: string): Id {
        return toast.success(message);
    }

    public static error(message: string): Id {
        return toast.error(message);
    }

    public static warning(message: string): Id {
        return toast.warning(message);
    }

    public static info(message: string): Id {
        return toast.info(message);
    }

    public static loading(message: string): Id {
        return toast.loading(message);
    }

    public static updateToast(toastId: Id, message: string, type: TypeOptions) {
        toast.update(toastId, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: 3000,
        });
    }

    public static closeToast(toastId: Id) {
        toast.dismiss(toastId);
    }
}
