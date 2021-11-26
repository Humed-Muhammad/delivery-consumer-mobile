import React, { useState } from 'react'
import Container from '@Components/Atoms/Container'
import Input from '@Components/Atoms/Inputs'
import Map from '@Components/Organisms/Map'
import Button from '@Components/Atoms/Button'
import { useSelector } from 'react-redux'
import {
    addDropoffPlace,
    removeDropoffPlace,
    dropoffToogleModal,
    dropoffChangeIsChecked,
    removeReceiver,
    addDropoffLineCoordinates,
    removeDropoffLineCoordinates,
} from '@Redux/Slices/DropoffSlice'
import { Formik } from 'formik'
import CardConatiner from '@Components/Atoms/CardContainer'
import Text from '@Components/Atoms/Text'
import { Alert, ScrollView, View } from 'react-native'
import { Icons } from '@Components/Atoms/Icons'
import ModalView from '@Components/Organisms/Modal'
import { colors } from "@Utils/Color/colors"
import CheckboxInputs from "@Components/Molecules/CheckboxInputs"
import NonCheckboxInputs from "@Components/Molecules/NonCheckboxInputs"
import GooglePlacesInput from '@Components/Organisms/GooglePlace'
import AlertComponent from '@Components/Organisms/AlertComponent'
import { namePhoneValidation } from "@Utils/Validation/ValidationSchemas"
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'
import Badge from '@Components/Organisms/Badge'
import { languageData } from '@Redux/MemoizedSelectors'

const Dropoff = ({ navigation }) => {
    let [isSender, setIsSender] = useState(false)
    let [to, setTo]: any = useState({})
    let [labor_force, setLaborForce] = useState(0)
    let [remark, setRemark] = useState("")
    const dispatch = useAppDispatch();
    const { dropoffPlace } = useSelector((state: any) => state.dropoff)
    const { dropoffIsChecked } = useSelector((state: any) => state.dropoff.status)
    const { pickupPlace } = useSelector((state: any) => state.pickup)
    const { dropoffModalStatus } = useSelector((state: any) => state.dropoff.status)
    const { Dropoff, Dropoff_Dialog } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    const iconStyle = {
        right: 1,
        top: 1,
        zIndex: 100
    }

    const handleDataSubmit = (values, pass) => {
        let receiverInfo = {}
        if (to.latitude) {
            if (!dropoffIsChecked) {
                receiverInfo = values

            } else if (dropoffIsChecked && !isSender) {
                receiverInfo = { name: "Ahmed", phone_number: "0913452000" }

                dispatch(dropoffChangeIsChecked(false))
            } else if (isSender) {
                receiverInfo = values
                setIsSender(false)
            }
            dispatch(addDropoffPlace({ ...to, ...receiverInfo, labor_force }))
            dispatch(addDropoffLineCoordinates({
                latitude: to.latitude,
                longitude: to.longitude,
            }))
            pass && setTimeout(() => navigation.navigate("Summary", {
                remark: remark
            }), 50)
            setTo({})
        }
        else {
            const title = Dropoff[languageType].Dialog_title
            const message = Dropoff[languageType].Dialog_description
            const pressOk = () => console.log("Ok pressed")
            AlertComponent(title, message, pressOk)

        }
    }
    const handleModalSubmit = (values) => {
        let receiverInfo = {}
        if (to.latitude) {
            if (!dropoffIsChecked && !isSender) {
                receiverInfo = values

            } else if (dropoffIsChecked && isSender) {
                receiverInfo = values

            } else if (dropoffIsChecked && !isSender) {
                receiverInfo = { name: "Client", phone_number: "0912974103" }
            }
            dispatch(addDropoffPlace({ ...to, ...receiverInfo, labor_force }))
            dispatch(addDropoffLineCoordinates({
                latitude: to.latitude,
                longitude: to.longitude,
            }))
            dispatch(dropoffToogleModal())
            setTo({})
        } else {
            const title = Dropoff[languageType].Dialog_title
            const message = Dropoff[languageType].Dialog_description
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
                    onSubmit={values => { handleDataSubmit(values, false) }}
                    validationSchema={(isSender || !dropoffIsChecked) && namePhoneValidation()}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }: any) => (
                        <>
                            {
                                dropoffPlace.length == 0 && (

                                    <Container direction="column" justify="center" >
                                        <Container justify="flex-start" width="90%">
                                            {
                                                dropoffIsChecked ? (
                                                    <CheckboxInputs setIsSender={setIsSender} isSender={isSender} keyboardType="numeric" errors={errors} touched={touched} handleChange={handleChange} text={Dropoff[languageType].Checkbox_title} />
                                                ) : (
                                                    <NonCheckboxInputs errors={errors} touched={touched} keyboardType="numeric" handleChange={handleChange} />
                                                )
                                            }
                                        </Container>
                                        <View style={{ width: "100%", height: 20, marginLeft: 40, marginVertical: 10 }}>
                                            <GooglePlacesInput top={-310} placeholder={Dropoff[languageType].Dropoff_location} from={to} setFrom={setTo} />
                                        </View>
                                        <Input width="85%" radius="0px" borderWidth="0px" borderBottomWidth={1} onChangeText={(text) => setTo({ ...to, specific_loaction: text })} placeholder={Dropoff[languageType].Specific_dropoff_location} />
                                        {pickupPlace.length <= 1 &&
                                            (
                                                <Container padd="0px" width="90%" justify="flex-start">
                                                    <Button width="50px" height="30px" onPress={handleSubmit} text={Dropoff[languageType].Add_button} />
                                                </Container>
                                            )
                                        }
                                    </Container>
                                )
                            }
                            <Container direction="column" width="90%" >
                                <Container direction="column">
                                    {
                                        dropoffPlace.length >= 1 && (
                                            <CardConatiner padd="11px" justify="flex-start"  >
                                                <ScrollView horizontal>
                                                    {
                                                        dropoffPlace && dropoffPlace.map((item, index) => (
                                                            <CardConatiner padd="10px" key={index} bg={colors.gray} justify="space-around" height="90%" width="170px">
                                                                <ScrollView horizontal>
                                                                    <Text color={colors.white} key={index} fontSize="12px" fontWeight="bold" >{item && item.location}</Text>
                                                                </ScrollView>
                                                                <Icons style={null} onPress={() => {
                                                                    dispatch(removeDropoffPlace(index))
                                                                    dispatch(removeReceiver(index))
                                                                    dispatch(removeDropoffLineCoordinates(index))
                                                                    dispatch(dropoffChangeIsChecked(true))
                                                                    setTo({})
                                                                }} color={colors.white} size={17} name="close" />
                                                            </CardConatiner>
                                                        ))
                                                    }
                                                </ScrollView>

                                                {
                                                    pickupPlace.length <= 1 && (
                                                        <Icons color={colors.icon} size={40} style={iconStyle} name="add" onPress={() => dispatch(dropoffToogleModal())} />
                                                    )}
                                                {
                                                    dropoffPlace.length > 1 && <Badge amount={dropoffPlace.length} />
                                                }
                                            </CardConatiner>
                                        )
                                    }

                                    <Input onChangeText={(text) => setRemark(text)} width="100%" placeholder={Dropoff[languageType].Additional_info} height="100px" />
                                </Container>

                                {dropoffModalStatus && <ModalView justify="flex-start" height="100%" width="100%" status={dropoffModalStatus.status} onPress={() => dispatch(dropoffToogleModal())}>
                                    <Formik
                                        initialValues={{ name: "", phone_number: "", weight: 1 }}
                                        onSubmit={(values) => {
                                            handleModalSubmit(values)
                                        }}
                                        validationSchema={(isSender || !dropoffIsChecked) && namePhoneValidation()}
                                    >
                                        {({ handleSubmit, handleChange, errors, touched }) => (
                                            <Container height="100%" direction="column">
                                                <Container padd="10px" direction="column" justify="space-between" align="flex-start" width="90%" >
                                                    <Container padd="20px" >
                                                        <Text fontWeight="bold" color={colors.gray} fontSize="20px" > {Dropoff_Dialog[languageType].Title} </Text>
                                                    </Container>
                                                    {
                                                        dropoffIsChecked ? (
                                                            <CheckboxInputs setIsSender={setIsSender} isSender={isSender} keyboardType="numeric" errors={errors} touched={touched} handleChange={handleChange} text="I am not the receiver" />
                                                        ) : (
                                                            <NonCheckboxInputs errors={errors} touched={touched} keyboardType="numeric" handleChange={handleChange} />
                                                        )
                                                    }
                                                </Container>

                                                <Container height="150px" direction="column">
                                                    <View style={{ width: "100%", height: 60, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginLeft: 40, }}>
                                                        <GooglePlacesInput placeholder={Dropoff_Dialog[languageType].Dropoff_location} from={to} setFrom={setTo} />
                                                    </View>
                                                    <Input width="85%" radius="0px" borderWidth="0px" borderBottomWidth={1} onChangeText={text => setTo({ ...to, specific_loaction: text })} placeholder={Dropoff_Dialog[languageType].Specific_dropoff_location} />
                                                </Container>
                                                <Container padd="0px" width="90%" justify="flex-end">
                                                    <Button width="50px" height="30px" onPress={handleSubmit} text="Add" />
                                                </Container>
                                            </Container>
                                        )}
                                    </Formik>
                                </ModalView>}

                            </Container>
                            <Container justify="space-around" >
                                <Button onPress={() => navigation.navigate("Pickup")} text={Dropoff[languageType].Back_button} width="45%" />
                                <Button bg={colors.secondary} onPress={() => {
                                    if (dropoffPlace.length == 0) {
                                        handleDataSubmit(values, true)
                                    } else {
                                        navigation.navigate("Summary", {
                                            remark: remark
                                        })
                                    }
                                }} text={Dropoff[languageType].Next_button} width="45%" />
                            </Container>
                        </>

                    )}

                </Formik>
            </Container>
        </Container>
    )
}

export default Dropoff
