import { postRequest } from "@Api/index"
import { showToast } from "@Utils/Toast"
import { errorToast, successToast } from "@Utils/Toast/toastConfig"

export const reportingFunction = async (setReportLoading, setOpenReportModal, orderId, reportType, additionalInfo,) => {
    setReportLoading(true)
    const formData: any = new FormData()
    formData.append("order_id", orderId)
    formData.append("report_type", reportType)
    formData.append("complain", additionalInfo)

    const data: any = await postRequest("Order/Complain/add_complain", formData)
    if (data.status) {
        showToast(successToast("Success", "Your report add successfully!"))
        setTimeout(() => {
            setReportLoading(false)
        }, 500)
        setOpenReportModal(false)
    } else {
        showToast(errorToast("Failed", "Unable to report!"))
        setTimeout(() => {
            setReportLoading(false)
        }, 500)
    }
}