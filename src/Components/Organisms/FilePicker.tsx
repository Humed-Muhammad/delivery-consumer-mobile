import * as React from 'react'
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
} from 'react-native-document-picker'
import { Icons } from '@Components/Atoms/Icons'
import { colors } from '@Utils/Color/colors'
import { useDispatch } from 'react-redux'
import RNFetchBlob from 'rn-fetch-blob'
import { useAppSelector } from '@Redux/Hooks'
import { changeProfileImage } from "@Redux/Slices/AccountSlice"
import { postRequest } from '@Api/index'
import { showToast } from '@Utils/Toast'
import { errorToast } from '@Utils/Toast/toastConfig'


interface ResponseType {
    status: boolean,
    message: string
}


function FilePicker({ setLoading }) {
    const { userId } = useAppSelector((state) => state.account)

    const dispatch = useDispatch()

    const style = {
        position: "absolute",
        zIndex: 10,
        right: "5.5%",
        bottom: 2,
        color: colors.gray,
        border: "2px solid",
        height: 50,
        width: 50,
        backgroundColor: colors.lightGray,
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    // const [result, setResult] = React.useState<
    //     Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
    // >()

    const handleError = (err: unknown) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }

    const pickProfileImage = async () => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
            })
            const imageResult = pickerResult
            const type = imageResult.type
            const extension = type.substring(type.indexOf("/") + 1)
            const base64 = await RNFetchBlob.fs.readFile(imageResult.uri, "base64")
            const endResult = `${extension},${base64}`
            setLoading(true)
            const formData = new FormData()
            formData.append("id", userId)
            formData.append("image", endResult)
            const { status, message }: Partial<ResponseType> = await postRequest("Account/change_profile_image", formData)
            console.log(status, message)
            if (status) {
                setTimeout(() => setLoading(false), 2000)
                dispatch(changeProfileImage(imageResult.uri))
            } else {
                setLoading(false)
                showToast(errorToast("Failed", "Some thing went wrong please try again!"))
            }
        } catch (e) {
            handleError(e)
        }
    }

    return (
        <Icons style={style} size={40} color={colors.white} name="camera-alt" onPress={() => pickProfileImage()} />
    )
}

export default React.memo(FilePicker)