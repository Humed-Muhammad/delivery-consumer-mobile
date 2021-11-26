import { ToastShowParams } from "react-native-toast-message"


export const successToast = (header: string, description: string, autoHide: boolean = true) => {
    const toastPrams: ToastShowParams = {
        type: "success",
        text1: header,
        text2: description,
        topOffset: 100,
        autoHide: autoHide,
        visibilityTime: 2000
    }

    return toastPrams
}


export const persistSuccessToast = (header: string, description: string, autoHide: boolean = false) => {
    const toastPrams: ToastShowParams = {
        type: "success",
        text1: header,
        text2: description,
        topOffset: 100,
        autoHide: autoHide,
    }

    return toastPrams
}



export const errorToast = (header: string, description: string, offSet: number = 100, autoHide: boolean = true) => {
    const toastPrams: ToastShowParams = {
        type: "error",
        text1: header,
        text2: description,
        topOffset: offSet,
        autoHide: autoHide,
        visibilityTime: 3000,
    }
    return toastPrams

}


export const persistErrorToast = (header: string, description: string, autoHide: boolean = false) => {
    const toastPrams: ToastShowParams = {
        type: "error",
        text1: header,
        text2: description,
        topOffset: 100,
        autoHide: autoHide,
    }
    return toastPrams

}