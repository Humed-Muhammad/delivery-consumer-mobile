import React, { useCallback, useEffect, useState } from 'react'
import CardConatiner from '@Components/Atoms/CardContainer'
import Text from '@Components/Atoms/Text'
import Container from '@Components/Atoms/Container'
import { colors } from '@Utils/Color/colors'
import OrderTrack from '@Components/Organisms/OrderTrack'
import Button from '@Components/Atoms/Button'
import { postRequest } from '@Api/index'
import { Rating } from 'react-native-elements'
import Reports from '@Components/Organisms/Reports'
import { ScrollView } from 'react-native'
import { Box } from '@Components/Atoms/Box'
import { showToast } from '@Utils/Toast'
import { errorToast, successToast } from '@Utils/Toast/toastConfig'
import Loader from '@Components/Organisms/Loader'
import { cancelOrder } from "@Redux/Slices/OrderSlice"
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'
import { Divider } from '@Components/Organisms/Divider'
import Input from '@Components/Atoms/Inputs'
import ModalView from '@Components/Organisms/Modal'
import RNPickerSelect from 'react-native-picker-select';
import { useQueryClient } from 'react-query'
import { reportingFunction } from '@Utils/Function'
import Stepper from '@Components/Molecules/Stepper'
import { languageData } from '@Redux/MemoizedSelectors'
import Image from '@Components/Atoms/Image'

const OrderDetail = ({ route, navigation }) => {
    const queryClient = useQueryClient()
    const [orderDetail, setOrderDetail] = useState(null)
    let [pickupLocations, setPickupLocations] = useState([])
    let [dropoffLocations, setDropoffLocations] = useState([])
    let [openReportModal, setOpenReportModal] = useState(false)
    const [reportLoading, setReportLoading] = useState(false)
    let [additionalInfo, setAdditionalInfo] = useState("")
    let [reportId, setReportId] = useState<number>(null)
    let [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { consumer_id, order_id, index } = route.params

    const { Order_detail, Report_Modal } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    const reportType = [
        { value: 1, label: "Loast item" },
        { value: 2, label: "Fight with driver" },
        { value: 3, label: "Delayed order" },
        { value: 4, label: "Brode cah" }
    ]

    const reportProblem = async (orderId) => {
        queryClient.invalidateQueries(`reports${orderId}`)
        reportingFunction(setReportLoading, setOpenReportModal, orderId, reportType[reportId]["label"], additionalInfo)
    }
    const fetchData = useCallback(async () => {
        const formData = new FormData();
        formData.append("consumer_id", consumer_id)
        formData.append("order_id", order_id)
        const data: any = await postRequest("Order/order_detail", formData)
        setOrderDetail(await data)
        let arrayPickup = []
        let arrayDropoff = []
        if (data.pickup_information instanceof Array) {
            data.pickup_information.map((value, key) => (
                arrayPickup.push(value.location)
            ))
        } else {
            arrayPickup.push(data.pickup_information.location)
        }

        if (data.dropoff_information instanceof Array) {
            data.dropoff_information.map((value, key) => (
                arrayDropoff.push(value.location)
            ))
        } else {
            arrayDropoff.push(data.dropoff_information.location)
        }
        setPickupLocations(arrayPickup)
        setDropoffLocations(arrayDropoff)
    }, [consumer_id, order_id])
    useEffect(() => {
        fetchData()
        return () => null
    }, [fetchData])


    return (
        loading ? (<Loader />) : (
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                {openReportModal &&
                    (<ModalView onPress={() => setOpenReportModal(false)} justify="space-around" height="60%" width="90%" status={openReportModal} >
                        <Container align="flex-start" width="80%" direction="column">
                            <Text>{Report_Modal[languageType].Dropdown_label}</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setReportId(value - 1)}
                                items={reportType}
                            />
                        </Container>
                        <Input onChangeText={(text) => setAdditionalInfo(text)} width="80%" height="30%" placeholder={Report_Modal[languageType].Additional_info} />
                        <ReportLoader reportLoading={reportLoading} order_id={order_id} reportProblem={reportProblem} />
                    </ModalView>)}
                <CardConatiner padd="10px" direction="column" justify="" width="95%" >
                    <Container justify="space-around" width="100%" direction="column">
                        <Container width="100%" align="flex-start" direction="column">
                            <Stepper arrayOne={pickupLocations} arrayTwo={dropoffLocations} />

                        </Container>
                    </Container>
                    <Container width="96%" justify="flex-start">
                        <Text fontWeight="bold">{Order_detail[languageType].Order_number}: <Text color={colors.secondary}>#2345</Text></Text>
                    </Container>
                    <Container width="96%" justify="flex-start">
                        <Text fontWeight="bold">{Order_detail[languageType].Date}: <Text color={colors.secondary}>2021/12/2-3: 00</Text></Text>
                    </Container>
                    <Container justify="space-around" >
                        <Container width="50%" align="flex-start" direction="column">
                            <Text fontWeight="bold"><Image imageWidth={30} imageHeight={30} source={require("@Assets/Images/dollar.png")} /> <Text color={colors.secondary}>210 Birr</Text></Text>
                        </Container>
                        <Container width="40%">
                            <Text fontWeight="bold"><Image imageWidth={30} imageHeight={30} source={require("@Assets/Images/distance.png")} /> <Text color={colors.secondary}>20km</Text></Text>
                        </Container>
                    </Container>
                    <OrderTrack position={orderDetail && orderDetail.status} />
                    <Container justify="space-around">
                        <Rating type="custom" ratingColor={colors.yellow} imageSize={30} showRating />
                        <Container width="150px" direction="column">
                            <Button onPress={() => setOpenReportModal(true)} width="100%" margins="0px" paddings="0px" color={colors.blue} bg={colors.white} height="25px" text={Order_detail[languageType].Report_problem} />
                            <Divider width="50%" />
                        </Container>
                    </Container>
                    <Container bg="trasnparent" direction="column" width="100%">
                        <Button height="40px" bg={colors.blue} width="90%" text={Order_detail[languageType].Confirm_button} />
                        <Button onPress={async () => {
                            setLoading(true)
                            dispatch(cancelOrder(index))
                            const formdata = new FormData();
                            formdata.append("id", order_id)
                            formdata.append("consumer_id", consumer_id)
                            const data: any = await postRequest("Order/cancel_order", formdata)
                            if (data.status) {
                                showToast(successToast("Success", "your order successfully canceld!"))
                                setTimeout(() => {
                                    setLoading(false)
                                    navigation.navigate("Order list")
                                }, 500)
                            } else {
                                showToast(errorToast("Failed", "Some thing went wrong!"))
                            }
                        }} height="40px" width="90%" text={Order_detail[languageType].Cancel_button} />
                    </Container>
                </CardConatiner>
                <Box height={5} spacing={5} />
                <Reports order_id={order_id} />

            </ScrollView>
        )
    )
}



const ReportLoader = ({ reportLoading, reportProblem, order_id }) => {
    const { Report_Modal } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)
    return (
        reportLoading ? (<Loader height="30px" width="80%" />) : (
            <Button onPress={() => reportProblem(order_id)} text={Report_Modal[languageType].Submit_button} width="80%" />
        )
    )
}

export default OrderDetail
