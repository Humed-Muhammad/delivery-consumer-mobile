import React, { useState } from "react"
import Container from "@Components/Atoms/Container"
import PickupLocation from "@Components/Pages/PickupLocation"
import VehicleCard from "@Components/Organisms/VehicleCard"
import { ScrollView } from "react-native"
import Button from "@Components/Atoms/Button"
import Map from "@Components/Organisms/Map"
import { colors } from "@Utils/Color/colors"
import {
    pickupAddPickupPlace,
    pickupChangeIconStatus,
    pickupChangeIsChecked,
    addPickupLineCoordinates,
    resetPickup
} from '@Redux/Slices/PickUpSlice';
import { Formik } from "formik"
import { dropoffChangeIsChecked, resetDropoff } from "@Redux/Slices/DropoffSlice"
import { useAppDispatch, useAppSelector } from "@Redux/Hooks"
import { pickupPlaces, vehicleList, languageData } from "@Redux/MemoizedSelectors"
import AlertComponent from "@Components/Organisms/AlertComponent"
import { namePhoneValidation } from "@Utils/Validation/ValidationSchemas"
import PlaceAddingForm from "@Components/Template/PlaceAddingForm"
import { useGetQuery } from "@ReactQuery/Hooks"
import { UseQueryResult } from "react-query"
import { AxiosResponse } from "axios"

const Pickup = ({ navigation }) => {
    let [isSender, setIsSender] = useState(false)
    let [from, setFrom]: any = useState({})
    let [weightLabor, setWeightLabor] = useState({ weight: 0, labor_force: 0 })
    const dispatch = useAppDispatch()
    const pickupPlace = useAppSelector(pickupPlaces)
    const allVehicles = useAppSelector(vehicleList)
    const { Pickup } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    const { data }: UseQueryResult<unknown | any> = useGetQuery("Order/vehicle_list", "vehicle_list")
    const vehicles = allVehicles || data
    console.log(data)
    const Vehicles = vehicles.map((item, index) => {
        return (<VehicleCard item={item} key={index} index={index} />)
    })
    const handleDataSubmit = (values, pass) => {
        if (from.latitude) {
            const senderInfo = isSender ? values : { name: "jhon weak", phone_number: "0912974103" }
            dispatch(pickupChangeIconStatus())
            dispatch(pickupAddPickupPlace({ ...from, ...senderInfo, ...weightLabor }))
            dispatch(addPickupLineCoordinates({
                latitude: from.latitude,
                longitude: from.longitude,
            }))
            pass && navigation.navigate("Drop-off")
            setFrom({})
        } else {
            const title = Pickup[languageType].Dialog_title
            const message = Pickup[languageType].Dialog_description
            const pressOk = () => console.log("Ok pressed")
            AlertComponent(title, message, pressOk)
        }
    }

    return (
        <Container height="100%" width="100%">
            <Map />
            <Container direction="column" position="absolute" bottom="0px">
                <Formik
                    initialValues={{ name: "", phone_number: "" }}
                    onSubmit={(values) => handleDataSubmit(values, false)}
                    validationSchema={isSender && namePhoneValidation()}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }: any) => (
                        <>
                            {
                                pickupPlace.length == 0 && (
                                    <PlaceAddingForm dispatchActionOne={pickupChangeIsChecked} dispatchActionTwo={dropoffChangeIsChecked} setterFunctionOne={setIsSender} setterValueOne={isSender} setterFunctionTwo={setWeightLabor} setterValueTwo={weightLabor} formikHandleSubmit={handleSubmit} formikValue={values} formikHandleChange={handleChange} errors={errors} touched={touched} setterFunctionThree={setFrom} setterValueThree={from} />
                                )
                            }
                            <PickupLocation from={from} setFrom={setFrom} setIsSender={setIsSender} text={Pickup[languageType].Checkbox_title} />
                            <ScrollView horizontal={true}>
                                {
                                    Vehicles
                                }
                            </ScrollView>
                            <Container justify="space-around" >
                                <Button height="43px" onPress={() => {
                                    dispatch(resetPickup())
                                    dispatch(resetDropoff())
                                    navigation.navigate("Root")
                                }} text={Pickup[languageType].Cancel_button} width="45%" />
                                <Button height="43px" bg={colors.secondary} onPress={() => {
                                    if (pickupPlace.length < 1) {
                                        handleDataSubmit(values, true)
                                    } else {
                                        navigation.navigate("Drop-off")
                                    }
                                }} text={Pickup[languageType].Next_button} width="45%" />

                            </Container>
                        </>
                    )}
                </Formik>
            </Container>
        </Container>
    )
}

export default Pickup
