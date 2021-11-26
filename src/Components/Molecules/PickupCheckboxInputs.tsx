import React, { SetStateAction, useState } from 'react'
import Container from '@Components/Atoms/Container'
import Input from '@Components/Atoms/Inputs'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from '@Utils/Color/colors';
import FormError from '@Components/Organisms/FormError';
import { SetState } from 'immer/dist/internal';
import { pickupChangeIsChecked } from '@Redux/Slices/PickUpSlice';
import { dropoffChangeIsChecked } from '@Redux/Slices/DropoffSlice';
import { useAppDispatch } from '@Redux/Hooks';
import { FormikHandlers } from 'formik';

interface Props {
    setterFunctionOne: SetStateAction<any>,
    setterValueOne: boolean,
    text: string,
    errors: any,
    touched: any,
    formikHandleChange: any
}




const PickupCheckboxInputs = ({ setterFunctionOne, setterValueOne, text, errors, touched, formikHandleChange }: Partial<Props>) => {
    const dispatch = useAppDispatch()
    return (
        <Container direction="column" width="90%" >
            <Container justify="flex-start" >
                <BouncyCheckbox style={{ marginBottom: 12 }} fillColor={`${colors.secondary}`} textStyle={{ textDecorationLine: "none" }} text={text} onPress={(isChecked: boolean) => {
                    setterFunctionOne(isChecked)
                    dispatch(pickupChangeIsChecked("_"))
                    dispatch(dropoffChangeIsChecked("_"))
                }} />
            </Container>
            {
                setterValueOne && (<Container justify="space-between">
                    <Container width="50%" direction="column">
                        <Input maxLength={55} onChangeText={formikHandleChange("name")} radius="0px" borderWidth="0px" borderBottomWidth={0.5} placeholder="Full name" width="100%" />
                        <FormError error={errors.name} touched={touched.name} />
                    </Container>
                    <Container width="50%" direction="column">
                        <Input maxLength={10} keyboardType="numeric" onChangeText={formikHandleChange("phone_number")} radius="0px" borderWidth="0px" borderBottomWidth={0.5} placeholder="Phone number" width="100%" />
                        <FormError error={errors.phone_number} touched={touched.phone_number} />
                    </Container>
                </Container>)
            }
        </Container>
    )
}

export default PickupCheckboxInputs
