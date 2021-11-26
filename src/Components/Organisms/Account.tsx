import React from 'react'
import Container from '@Components/Atoms/Container'
import Text from '@Components/Atoms/Text'
import { colors } from '@Utils/Color/colors'

const Account = ({ navigation, textOne, pathOne, pathTwo, textTwo }) => {
    return (
        <Container padd="7px" width="90%" justify={pathOne == "Register" ? "space-between" : "flex-end"}>
            <Text onPress={() => navigation.navigate(pathOne)} color={colors.blue} >{textOne}</Text>
            <Text onPress={() => navigation.navigate(pathTwo)} color={colors.blue} >{textTwo}</Text>
        </Container>
    )
}

export default Account
