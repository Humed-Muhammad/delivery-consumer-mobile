import Button from '@Components/Atoms/Button'
import Container from '@Components/Atoms/Container'
import Input from '@Components/Atoms/Inputs'
import { View } from 'native-base'
import React, { SetStateAction } from 'react'
import GooglePlace from '@Components/Organisms/GooglePlace'
import PickupCheckboxInputs from '@Components/Molecules/PickupCheckboxInputs'
import { languageData } from '@Redux/MemoizedSelectors'
import { useAppSelector } from '@Redux/Hooks'
import DatePicker from '@Components/Organisms/DatePicker'

interface Props {
    setterFunctionOne: SetStateAction<any>,
    setterValueOne: any,
    setterFunctionTwo: SetStateAction<any>,
    setterValueTwo: any,
    dispatchActionOne: any,
    dispatchActionTwo: any,
    errors: any,
    touched: any,
    formikHandleChange: any,
    formikHandleSubmit: any,
    handlerFunctionOne: Function,
    handlerFunctionTwo: Function,
    formikValue: Object,
    setterFunctionThree: SetStateAction<any>,
    setterValueThree: any,
}

// Object | string | boolean | number | Array<Object> | Array<String> | Array<String>


const PlaceAddingForm = ({ setterFunctionOne, setterValueOne, setterFunctionTwo, setterValueTwo, setterFunctionThree, setterValueThree, errors, formikHandleChange, formikHandleSubmit, formikValue, handlerFunctionOne, handlerFunctionTwo, touched }: Partial<Props>) => {

    const { Pickup } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    return (
        <Container padd="10px" direction="column" justify="space-between" align="center" width="100%" >
            <PickupCheckboxInputs errors={errors} touched={touched} formikHandleChange={formikHandleChange} text={Pickup[languageType].Checkbox_title} setterFunctionOne={setterFunctionOne} setterValueOne={setterValueOne} />
            <View style={{ width: "100%", height: 20, marginLeft: 40, marginVertical: 10 }}>
                <GooglePlace top={-335} placeholder={Pickup[languageType].Pickup_location} from={setterValueThree} setFrom={setterFunctionThree} />
            </View>
            <Container width="85%">
                <Input maxLength={50} width="70%" radius="0px" borderWidth="0px" borderBottomWidth={0.5} onChangeText={(text) => setterFunctionThree({ ...setterValueThree, specific_loaction: text })} placeholder={Pickup[languageType].Specific_pickup_location} />
                <Input maxLength={50} keyboardType="numeric" width="30%" radius="0px" borderWidth="0px" borderBottomWidth={0.5} onChangeText={(text) => setterFunctionTwo({ ...setterValueTwo, weight: text })} placeholder={Pickup[languageType].Weight} />
            </Container>
            <Container padd="0px" width="90%" justify="flex-start">
                <Button width="50px" height="30px" onPress={() => {
                    formikHandleSubmit(formikValue)
                }} text={Pickup[languageType].Add_button} />
                <DatePicker />
            </Container>
        </Container>
    )
}

export default PlaceAddingForm
