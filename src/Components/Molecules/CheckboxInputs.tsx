import React, { SetStateAction, useState } from 'react'
import Container from '@Components/Atoms/Container'
import Input from '@Components/Atoms/Inputs'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from '@Utils/Color/colors';
import FormError from '@Components/Organisms/FormError';
import { SetState } from 'immer/dist/internal';

interface Props {
    text: string,
    handleChange: any,
    errors: any,
    touched: any,
    keyboardType: string,
    isSender: boolean,
    setIsSender: SetStateAction<any>
}




const CheckboxInputs = ({ text, handleChange, errors, touched, keyboardType, isSender, setIsSender }: Partial<Props>) => {
    return (
        <Container direction="column" width="100%" >
            <Container justify="flex-start" >
                <BouncyCheckbox fillColor={`${colors.secondary}`} textStyle={{ textDecorationLine: "none" }} text={text} onPress={(isChecked: boolean) => { setIsSender(isChecked) }} />
            </Container>
            {
                isSender && (<Container>
                    <Container width="50%" direction="column">
                        <Input maxLength={55} onChangeText={handleChange("name")} radius="0px" borderWidth="0px" borderBottomWidth={1} placeholder="Full name" width="100%" />
                        <FormError error={errors.name} touched={touched.name} />
                    </Container>
                    <Container width="50%" direction="column">
                        <Input maxLength={10} keyboardType={keyboardType} onChangeText={handleChange("phone_number")} radius="0px" borderWidth="0px" borderBottomWidth={1} placeholder="Phone number" width="100%" />
                        <FormError error={errors.phone} touched={touched.phone} />
                    </Container>
                </Container>)
            }
        </Container>
    )
}

export default CheckboxInputs
