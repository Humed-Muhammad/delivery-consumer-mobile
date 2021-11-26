import React from 'react'
import Container from '@Components/Atoms/Container'
import Text from '@Components/Atoms/Text'
import { colors } from '@Utils/Color/colors'
import { Icons } from '@Components/Atoms/Icons'
import CardConatiner from '@Components/Atoms/CardContainer'
import { useDispatch } from "react-redux"

const Navbar = (props: any) => {
    const dispatch = useDispatch()

    return (
        <CardConatiner radius="0px" margins="0px" padd="0px" height="55px" width="100%" justify="flex-start" >
            <Container width="20%">
                <Icons style={null} color={colors.gray} size={30} name="menu" onPress={() => props.navigation.openDrawer()} />
            </Container>
            <Container width="60%">
                <Text fontSize="20px" fontWeight="bold" color={colors.gray} >{props.title}</Text>
            </Container>
        </CardConatiner>
    )
}

export default Navbar
