import React, { useEffect, useState } from 'react'
import Text from '@Components/Atoms/Text'
import Container from '@Components/Atoms/Container'
import Image from '@Components/Atoms/Image'
import Button from '@Components/Atoms/Button'
import CardConatiner from '@Components/Atoms/CardContainer'
import { colors } from '@Utils/Color/colors'
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'
import { pickupPlaces, dropoffPlaces, vehiclesSelector, pickupLineCoordinates, dropoffLineCoordinates, vehicleId, languageData, } from "@Redux/MemoizedSelectors"
import { getDistance } from 'geolib'
import { getRequest, postRequest } from '@Api/index'
import { getJsonData } from '@Utils/AccessStorage'
import { useQueryClient } from 'react-query'
import { resetPickup } from '@Redux/Slices/PickUpSlice'
import { resetDropoff } from '@Redux/Slices/DropoffSlice'
import { Icons } from '@Components/Atoms/Icons'
import { Divider } from '@Components/Organisms/Divider'
import { fonts } from '@Utils/Fonts'
import { showToast } from '@Utils/Toast'
import { persistErrorToast, successToast } from '@Utils/Toast/toastConfig'
import Loader from '@Components/Organisms/Loader'
import { getOrders } from '@Redux/Slices/OrderSlice'

const Summary = ({ navigation, route }) => {

    const { remark } = route.params


    const queryClient = useQueryClient()
    let [tripType, setTripType] = useState("single")
    let [totalDistance, setTotalDistance] = useState(0)
    let [userId, setUserId] = useState("")
    let [loading, setLoading] = useState(false)
    const pickupPlace = useAppSelector(pickupPlaces)
    const dropoffPlace = useAppSelector(dropoffPlaces)
    const vehicles = useAppSelector(vehiclesSelector)
    const pickupCoordinate = useAppSelector(pickupLineCoordinates)
    const dropoffCoordinate = useAppSelector(dropoffLineCoordinates)
    const vehicle_type_id = useAppSelector(vehicleId)
    const { Summary } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()
    useEffect(() => {
        let distance = []
        if (pickupCoordinate.length >= dropoffCoordinate.length) {
            pickupCoordinate.map((item) => {
                distance.push(getDistance(item, dropoffCoordinate[0]))
            })
            setTotalDistance(distance.reduce((total, current) => total + current))
        } else {
            dropoffCoordinate.map((item) => {
                distance.push(getDistance(item, pickupCoordinate[0]))
            })
            setTotalDistance(distance.reduce((total, current) => (total + current)))
        }
        const fetchData = async () => {
            const data = await getJsonData("user_data");
            setUserId(await data.message.id)
        }
        fetchData()
        return () => {
            setUserId("")
        }
    }, [])

    const clearDataAndNavigate = (time) => {
        return (
            setTimeout(() => {
                navigation.navigate("Root")
                dispatch(resetPickup())
                dispatch(resetDropoff())
                setLoading(false)
            }, time)
        )
    }


    const handleSubmit = async () => {
        const estimation: any = {}
        estimation["distance"] = totalDistance / 1000;
        estimation["price"] = 210;
        const jsonData = {
            pickup_information: JSON.stringify(pickupPlace),
            dropoff_information: JSON.stringify(dropoffPlace),
            consumer_id: userId,
            vehicle_type_id: vehicle_type_id,
            remark: remark,
            order_date: "2021-10-21 3:31:33",
            trip_type: tripType,
            estimation: JSON.stringify(estimation)
        }

        const data: any = await postRequest("Order/create_order", jsonData, "")
        if (data.status) {
            const ordersData = await getRequest(`Order/order_list/${userId}`, "")
            dispatch(getOrders(ordersData))
            showToast(successToast("Success", "Your order successfully created!"))
            setLoading(true)
            clearDataAndNavigate(1100)
        } else {
            showToast(persistErrorToast("Failed", "Some thing is went wrong please try again!"))
        }
        queryClient.invalidateQueries("order_list")
    }

    const pickupLocations = pickupPlace.map((item, index) => (
        <Text key={item}><Icons color={colors.red} name="place" /> <Text fontWeight="bold">{Summary[languageType].From}:</Text> {item.location}</Text>
    ))

    const dropoffLocations = dropoffPlace.map(item => (
        <Text key={item}><Icons color={colors.red} name="place" /> <Text fontWeight=" bold">{Summary[languageType].To}:</Text> {item.location}</Text>
    ))

    return (
        loading ? (<Loader />) : (
            <Container justify="flex-start" height="100%" direction="column">
                <Container height="100px" direction="column">
                    <Text fontWeight="bold" fontSize={fonts.large} >{Summary[languageType].Title}</Text>
                    <Divider thikness={3} color={colors.yellow} width={100} />
                </Container>
                <Container direction="column">
                    <Container >
                        <CardConatiner radius="0px" justify="flex-start" padd="10px" width="90%" height="150px">
                            <Image radius={1} imageHeight="100%" imageWidth="100%" source={{
                                uri: vehicles[0]["uri"]
                            }} />
                        </CardConatiner>
                    </Container>
                    <CardConatiner justify="flex-start" radius="0px" padd="10px" width="90%" direction="column" align="flex-start">
                        {
                            pickupLocations
                        }
                        <Divider spacing={5} color={colors.yellow} />
                        {
                            dropoffLocations
                        }
                    </CardConatiner>
                    <CardConatiner radius="0px" padd="10px" width="90%" justify="flex-start">
                        <Text><Text fontWeight=" bold">{Summary[languageType].Estimation}:</Text> {totalDistance / 1000}km, {210}Birr </Text>
                    </CardConatiner>
                </Container>
                <Container align="flex-end" height="30%" justify="space-around" >
                    <Button height="40px" bg={colors.red} onPress={() => {
                        setLoading(true)
                        clearDataAndNavigate(200)
                    }} width="40%" text={Summary[languageType].Cancel_button} />
                    <Button height="40px" onPress={() => handleSubmit()} bg={colors.icon} width="40%" text={Summary[languageType].Confirm_button} />
                </Container>
            </Container>
        )
    )
}

export default Summary
