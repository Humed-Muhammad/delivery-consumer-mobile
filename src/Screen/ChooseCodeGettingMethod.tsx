import React, { useState } from 'react'
import Button from '@Components/Atoms/Button'
import Container from '@Components/Atoms/Container'
import { colors } from '@Utils/Color/colors'
import Text from '@Components/Atoms/Text'
import Logo from '@Components/Organisms/Logo'
import { NativeBaseProvider, Radio } from 'native-base'
import { fonts } from '@Utils/Fonts'
import { postRequest } from '@Api/index'

interface ParamsType {
    email: string,
    phone_number: string,
    full_name: string
}




const ChooseMethod = ({ route, navigation }) => {
    const { email, phone_number, full_name }: ParamsType = route.params
    let [value, setValue] = useState(email)

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("email", value)
        const data = await postRequest("Account/send_pin", formData)
        navigation.navigate("Verify")
    }

    return (

        <Container direction="column" height="100%">
            <Logo />
            <Container direction="column" justify="space-evenly" bg={colors.white} height="50%">
                <Text fontWeight="bold" fontSize="20px">How do you want to rest your password?</Text>
                <Container direction="column">
                    <Text fontSize={fonts.large}>{full_name}...</Text>
                    <Radio.Group
                        name="myRadioGroup"
                        value={value}
                        onChange={(nextValue) => {
                            setValue(nextValue);
                        }}
                    >
                        <Radio value={email} my={1}>
                            Send Email to {email}
                        </Radio>
                        <Radio value={phone_number} my={1}>
                            Send SMS to {phone_number}
                        </Radio>
                    </Radio.Group>
                </Container>
                <Button onPress={() => handleSubmit()} width="90%" text="Send" />
            </Container>
        </Container>

    )
}

export default ChooseMethod

