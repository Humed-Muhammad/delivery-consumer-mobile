import React from 'react'
import Container from '@Components/Atoms/Container'
import Input from '@Components/Atoms/Inputs'
import FormError from '@Components/Organisms/FormError';
import { useAppSelector } from '@Redux/Hooks';
import { languageData } from '@Redux/MemoizedSelectors';

const Sender = ({ handleChange, keyboardType, errors, touched }) => {
    const { Pickup_Dialog } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    return (
        <Container width="100%" >
            <Container width="50%" direction="column">
                <Input maxLength={55} onChangeText={handleChange("name")} radius="0px" borderWidth="0px" borderBottomWidth={1} placeholder={Pickup_Dialog[languageType].Full_name} width="100%" />
                <FormError error={errors.name} touched={touched.name} />
            </Container>
            <Container width="50%" direction="column">
                <Input maxLength={10} keyboardType={keyboardType} onChangeText={handleChange("phone_number")} radius="0px" borderWidth="0px" borderBottomWidth={1} placeholder={Pickup_Dialog[languageType].Phone_number} width="100%" />
                <FormError error={errors.phone_number} touched={touched.phone_number} />
            </Container>
        </Container>
    )
}







export default Sender
