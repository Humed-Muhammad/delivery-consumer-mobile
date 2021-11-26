import Toast, { ToastProps } from "react-native-toast-message"

/**@Custom_toast for showing success and failair messages  */

export const showToast = (props: ToastProps) => {
    Toast.show({ ...props });
}
