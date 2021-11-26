import React, { useState } from "react"
import Button from "@Components/Atoms/Button"
import CardConatiner from "@Components/Atoms/CardContainer"
import Container from "@Components/Atoms/Container"
import { Icons } from "@Components/Atoms/Icons"
import Input from "@Components/Atoms/Inputs"
import Text from "@Components/Atoms/Text"
import { colors } from "@Utils/Color/colors"
import { Formik } from "formik"
import { ScrollView, View } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useDispatch, useSelector } from "react-redux"
import ModalView from "../Organisms/Modal"
import {
  pickupToogleModal,
  pickupAddPickupPlace,
  pickupRemovePickupPlace,
  pickupChangeIsChecked,
  removeSender,
  addPickupLineCoordinates,
  removePickupLineCoordinates
} from '@Redux/Slices/PickUpSlice';
import NonCheckboxInputs from "@Components/Molecules/NonCheckboxInputs"
import GooglePlacesInput from "../Organisms/GooglePlace"
import FormError from "@Components/Organisms/FormError"
import { useAppSelector } from "@Redux/Hooks"
import { pickupPlaces, dropoffPlaces, sender, languageData } from "@Redux/MemoizedSelectors"
import { namePhoneValidation } from "@Utils/Validation/ValidationSchemas"
import Badge from "@Components/Organisms/Badge"
import AlertComponent from "@Components/Organisms/AlertComponent"


const Location = ({ text, setIsSender, setFrom, from }) => {
  const [checked, setChecked] = useState(false)
  let [weightLabor, setWeightLabor] = useState({ weight: 0, labor_force: 0 })
  const dispatch = useDispatch()
  const pickupPlace = useAppSelector(pickupPlaces)
  const { pickupModalStatus } = useSelector((state: any) => state.pickup.status)
  const dropoffPlace = useAppSelector(dropoffPlaces)
  const { pickupIsChecked } = useSelector((state: any) => state.pickup.status)
  const { Pickup_Dialog } = useAppSelector(languageData)
  const { languageType } = useAppSelector(state => state.user)


  const iconStyle = {
    right: 1,
    top: 1,
    zIndex: 100
  }


  const handleSubmit = (values) => {
    let senderInfo = {}
    if (!checked) {
      dispatch(pickupChangeIsChecked(false))
    } else {
      setChecked(false)
    }
    if (!pickupIsChecked) {
      senderInfo = values
    } else if (pickupIsChecked && !checked) {
      senderInfo = { name: "client", phone_number: "0943645675" }
    } else if (pickupIsChecked && checked) {
      senderInfo = values
    }
    if (from.latitude) {
      dispatch(pickupAddPickupPlace({ ...from, ...senderInfo, ...weightLabor }))
      dispatch(pickupToogleModal())
      dispatch(addPickupLineCoordinates({
        latitude: from.latitude,
        longitude: from.longitude,
      }))
      setFrom({})
    } else {
      const title = Pickup_Dialog[languageType].Dialog_title
      const message = Pickup_Dialog[languageType].Dialog_description
      const pressOk = () => console.log("Ok pressed")
      AlertComponent(title, message, pressOk)
    }
  }

  return (
    <Container direction="column" width="95%" >
      <Container>
        {pickupPlace.length >= 1 && (
          <CardConatiner padd="11px" justify="flex-start"  >
            <ScrollView horizontal>

              {
                pickupPlace && pickupPlace.map((item, index) => (
                  <CardConatiner padd="10px" key={index} bg={colors.gray} justify="space-around" height="90%" width="170px">
                    <ScrollView horizontal>
                      <Text color={colors.white} bg="gray" key={index} fontSize="12px" fontWeight="bold" >{item && item.location}</Text>
                    </ScrollView>
                    <Icons style={null} onPress={() => {
                      dispatch(pickupRemovePickupPlace(index))
                      dispatch(removePickupLineCoordinates(index))
                      dispatch(removeSender(index))
                      setFrom({})
                      if (pickupPlace.length <= 1) {
                        dispatch(pickupChangeIsChecked(false))
                        setIsSender(false)
                        setChecked(false)
                      }
                      if (!checked && !pickupIsChecked) {
                        dispatch(pickupChangeIsChecked("_"))
                      }
                    }} color={colors.white} size={17} name="close" />

                  </CardConatiner>
                ))
              }

            </ScrollView>

            {
              dropoffPlace.length <= 1 && (
                <Icons color={colors.icon} size={40} style={iconStyle} name="add" onPress={() => dispatch(pickupToogleModal())} />
              )
            }
            {
              pickupPlace.length > 1 && (
                <Badge amount={pickupPlace.length} />
              )
            }
          </CardConatiner>
        )}
      </Container>

      {pickupModalStatus && <ModalView justify="flex-start" height="100%" width="100%" status={pickupModalStatus.status} onPress={() => dispatch(pickupToogleModal())}>
        <Formik
          initialValues={{ name: "", phone_number: "", weight: 0 }}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
          validationSchema={(!pickupIsChecked || checked) && namePhoneValidation()}
        >
          {({ handleSubmit, values, handleChange, errors, touched }) => (
            <Container height="100%" direction="column">
              <Container padd="10px" direction="column" justify="space-between" align="flex-start" width="90%" >
                <Container padd="20px" >
                  <Text fontWeight="bold" color={colors.gray} fontSize="20px" > {Pickup_Dialog[languageType].Title} </Text>
                </Container>
                {
                  pickupIsChecked ? (
                    <Container direction="column" width="100%" >
                      <Container justify="flex-start" >
                        <BouncyCheckbox fillColor={`${colors.secondary}`} textStyle={{ textDecorationLine: "none" }} text={text} onPress={(isChecked: boolean) => {
                          setChecked(isChecked)
                        }} />
                      </Container>
                      {
                        checked && (<Container>
                          <Container width="50%" direction="column">
                            <Input onChangeText={handleChange("name")} radius="0px" borderWidth="0px" borderBottomWidth={1} placeholder={Pickup_Dialog[languageType].Full_name} width="100%" />
                            <FormError error={errors.name} touched={touched.name} />

                          </Container>
                          <Container width="50%" direction="column">
                            <Input keyboardType="numeric" onChangeText={handleChange("phone_number")} radius="0px" borderWidth="0px" borderBottomWidth={1} placeholder={Pickup_Dialog[languageType].Phone_number} width="100%" />
                            <FormError error={errors.phone_number} touched={touched.phone_number} />
                          </Container>
                        </Container>)
                      }
                    </Container>
                  ) : (
                    <NonCheckboxInputs errors={errors} touched={touched} keyboardType="numeric" handleChange={handleChange} />
                  )

                }
              </Container>
              <Container direction="column">
                <View style={{ width: "100%", height: 60, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginLeft: 40, }}>
                  <GooglePlacesInput placeholder={Pickup_Dialog[languageType].Pickup_location} from={from} setFrom={setFrom} />
                </View>
                <Container width="80%">
                  <Input width="70%" radius="0px" borderWidth="0px" borderBottomWidth={1} onChangeText={(text) => setFrom({ ...from, specific_loaction: text })} placeholder={Pickup_Dialog[languageType].Specific_pickup_location} />
                  <Input keyboardType="numeric" width="30%" radius="0px" borderWidth="0px" borderBottomWidth={1} onChangeText={(text) => setWeightLabor({ ...weightLabor, weight: text })} placeholder={Pickup_Dialog[languageType].Weight} />
                </Container>
                <Container height="50px" padd="12px" width="90%" justify="flex-end">
                  <Button position="absolute" width="50px" height="30px" onPress={handleSubmit} text={Pickup_Dialog[languageType].Add_button} />
                </Container>
              </Container>
            </Container>

          )}
        </Formik>
      </ModalView>}

    </Container >
  )
}

export default Location