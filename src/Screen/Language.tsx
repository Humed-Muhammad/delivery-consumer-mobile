import Button from '@Components/Atoms/Button'
import Container from '@Components/Atoms/Container'
import { Icons } from '@Components/Atoms/Icons'
import Image from '@Components/Atoms/Image'
import { Divider } from '@Components/Organisms/Divider'
import { colors } from '@Utils/Color/colors'
import React, { useState } from 'react'
import { setLanguageType } from '@Redux/Slices/UserSlice'
import { useAppDispatch } from '@Redux/Hooks'
import Loader from '@Components/Organisms/Loader'
import Text from '@Components/Atoms/Text'

const style = {
    position: "absolute",
    top: 5,
    left: 5
}

const Language = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    return (
        loading ? (<Container height="100%" direction="column">
            <Text>Changing Language...</Text>
            <Loader height="50px" />
        </Container>) : (
            <Container direction="column" height="100%">
                <Icons onPress={() => navigation.goBack(null)} color={colors.gray} size={30} name="arrow-back" style={style} />
                <Image imageWidth={50} imageHeight={50} source={require("@Assets/Images/language.png")} />
                <Container width="60%" direction="column">
                    <Button onPress={() => {
                        setLoading(true)
                        setTimeout(() => {
                            dispatch(setLanguageType("English"))
                            global.language = "English"
                            setLoading(false)
                            navigation.goBack(null)
                        }, 100)
                    }} color={colors.gray} bg={colors.white} text="English" />
                    <Divider thikness={0.5} color={colors.icon} />
                    <Button onPress={() => {
                        setLoading(true)
                        setTimeout(() => {
                            dispatch(setLanguageType("Amharic"))
                            setLoading(false)
                            navigation.goBack()
                        }, 100)
                    }} color={colors.gray} bg={colors.white} text="Amharic" />
                    <Divider thikness={0.5} color={colors.icon} />

                    <Button onPress={() => {
                        dispatch(setLanguageType("Afan oromo"))
                        navigation.goBack()
                    }} color={colors.gray} bg={colors.white} text="Afan oromo" />
                </Container>
            </Container>
        )
    )
}

export default Language
