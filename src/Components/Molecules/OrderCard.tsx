import React, { useState } from 'react'
import { TouchableHighlight } from "react-native"
import CardConatiner from '@Components/Atoms/CardContainer'
import Text from '@Components/Atoms/Text'
import { colors } from '@Utils/Color/colors'
import Container from '@Components/Atoms/Container'
import { Icons } from '@Components/Atoms/Icons'
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'
import { Divider } from '@Components/Organisms/Divider'
import Button from '@Components/Atoms/Button'
import Image from '@Components/Atoms/Image'
import { cancelOrder } from '@Redux/Slices/OrderSlice'
import { postRequest } from '@Api/index'
import { errorToast, successToast } from '@Utils/Toast/toastConfig'
import { showToast } from '@Utils/Toast'
import Loader from '@Components/Organisms/Loader'
import Input from '@Components/Atoms/Inputs'
import ModalView from '@Components/Organisms/Modal'
import { useQueryClient } from 'react-query'
import RNPickerSelect from 'react-native-picker-select';
import { languageData } from '@Redux/MemoizedSelectors'

const OrderCard = ({ handleClick, item, index }) => {
    const queryClient = useQueryClient()
    const [selectedOrder, setSelectedOrder] = useState("")
    let [openReportModal, setOpenReportModal] = useState(false)
    let [additionalInfo, setAdditionalInfo] = useState("")
    let [reportId, setReportId] = useState("")
    const [loading, setLoading] = useState(false)
    const [reportLoading, setReportLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { userId } = useAppSelector((state) => state.account)
    const { Order_list, Order_list_menu, Report_Modal } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    const style = {
        position: "absolute",
        right: 0,
        top: 1
    }

    const reportType = [
        { value: 1, label: "Loast item" },
        { value: 2, label: "Fight with driver" },
        { value: 3, label: "Delayed order" },
        { value: 4, label: "Brode cah" }
    ]

    /**@Handler_Function for cancelling orders */
    const handleOrderCancle = async (order_id, i) => {
        setLoading(true)
        const formdata = new FormData();
        formdata.append("id", order_id)
        formdata.append("consumer_id", userId)
        const data: any = await postRequest("Order/cancel_order", formdata)
        console.log(data)
        if (data.status) {
            dispatch(cancelOrder(i))
            showToast(successToast("Success", "Your order successfully canceld!"))
            setTimeout(() => {
                setLoading(false)
            }, 500)
        } else {
            showToast(errorToast("Failed", "Some thing went wrong!"))
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    /**@Handler_Function for reporting a problem */
    const reportProblem = async (orderId) => {
        setReportLoading(true)
        const formData: any = new FormData()
        formData.append("order_id", orderId)
        formData.append("report_type", reportType[reportId] && reportType[reportId]["label"])
        formData.append("complain", additionalInfo)

        const data: any = await postRequest("Order/Complain/add_complain", formData)
        queryClient.invalidateQueries(`reports${orderId}`)
        console.log(reportType[reportId])
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

    let pickupLocation = ""
    let dropoffLocation = ""

    if (item.pickup_information instanceof Array) {
        pickupLocation = item.pickup_information[0]['location']
    } else {
        pickupLocation = item.pickup_information["location"]
    }
    if (item.dropoff_information instanceof Array) {
        dropoffLocation = item.dropoff_information[0]['location']
    } else {
        dropoffLocation = item.dropoff_information["location"]
    }

    return (
        <TouchableHighlight onPress={() => handleClick(item.id, index)} style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} underlayColor={colors.white}  >
            <CardConatiner direction="column" width="95%">
                <Container direction="column" justify="space-around" width="100%" >
                    <Container width="100%" align="flex-start" direction="column">
                        <Text fontWeight="bold"><Icons color={colors.blue} name="lens" /> {Order_list[languageType].Pickup}: <Text color={colors.secondary}>{pickupLocation}</Text></Text>
                        <Divider direction="vertical" height={20} thikness={2} width={8} />
                        <Text fontWeight="bold"><Icons color={colors.yellow} name="lens" /> {Order_list[languageType].Dropoff}: <Text color={colors.secondary}>{dropoffLocation}</Text></Text>
                    </Container>
                    <Container justify="space-around" direction="column">
                        <Container width="97%" justify="flex-start">
                            <Text fontWeight="bold">{Order_list[languageType].Order_number}: <Text color={colors.secondary}>#{item.order_number}</Text></Text>
                        </Container>
                        <Container width="97%" justify="flex-start">
                            <Text fontWeight="bold">{Order_list[languageType].Date}: <Text color={colors.secondary}>{item.order_date}</Text></Text>
                        </Container>
                        <Container>
                            <Container width="70%" justify="space-between">
                                <Container width="50%" justify="flex-start" >
                                    <Image imageWidth={30} imageHeight={30} source={require("@Assets/Images/dollar.png")} />
                                    <Text color={colors.secondary}> {item.estimation.price} Birr</Text>
                                </Container>
                                <Container width="50%" justify="flex-start" >
                                    <Image imageWidth={30} imageHeight={30} source={require("@Assets/Images/distance.png")} />
                                    <Text color={colors.secondary}> {item.estimation.distance} km</Text>
                                </Container>
                            </Container>
                            <Button onPress={() => console.log(item.status)} margins="0px" bg={item.status == "pending" ? colors.icon : colors.yellow} height="25px" width="80px" text={item.status} />
                        </Container>
                    </Container>
                    <Container width="150px" direction="column" position="absolute" top="1px" right="0px" align="flex-end">
                        <Icons color={colors.gray} size={30} name="more-vert" onPress={() => {
                            setSelectedOrder(item.id)
                            setLoading(false)
                        }} />
                        {
                            (item.id === selectedOrder) && (
                                <CardConatiner justify="space-around" padd="5px" align="flex-start" radius="2px" direction="column" width="160px" height="78px" >
                                    <Icons onPress={() => setSelectedOrder("close")} size={20} style={style} name="close" />
                                    {
                                        loading ? (<Loader height="30px" width="80%" />) : (
                                            <Button onPress={() => handleOrderCancle(item.id, index)} align="flex-start" height="20px" width="80%" color={colors.gray} bg={colors.white} text={Order_list_menu[languageType].Cancel_order} />
                                        )
                                    }
                                    <Divider width="90%" />
                                    <Button onPress={() => {
                                        setOpenReportModal(true)
                                        setSelectedOrder(item.id)
                                    }
                                    } align="flex-start" height="20px" width="80%" color={colors.gray} bg={colors.white} text={Order_list_menu[languageType].Report_problem} />
                                </CardConatiner>
                            )
                        }
                    </Container>
                    {(openReportModal && item.id === selectedOrder) && <ModalView onPress={() => setOpenReportModal(false)} justify="space-around" height="60%" width="90%" status={openReportModal} >
                        <Container align="flex-start" width="80%" direction="column">
                            <Text>{Report_Modal[languageType].Dropdown_label}</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setReportId(value)}
                                items={reportType}
                            />
                        </Container>
                        <Input onChangeText={(text) => setAdditionalInfo(text)} width="80%" height="30%" placeholder={Report_Modal[languageType].Additional_info} />
                        {
                            reportLoading ? (<Loader height="30px" width="80%" />) : (
                                <Button onPress={() => {
                                    if (reportId) {
                                        reportProblem(item.id)
                                    } else {
                                        showToast(errorToast("Failed", "Please Choose a report type first!", 50))
                                        setTimeout(() => {
                                            setReportLoading(false)
                                        }, 500)
                                    }
                                }} text={Report_Modal[languageType].Submit_button} width="80%" />
                            )
                        }
                    </ModalView>}
                </Container>
            </CardConatiner>
        </TouchableHighlight>

    )
}






export default OrderCard
