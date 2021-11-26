import Container from '@Components/Atoms/Container'
import Logo from '@Components/Organisms/Logo'
import { colors } from '@Utils/Color/colors';
import React from 'react'
import { LinearProgress } from 'react-native-elements';

const SplashScreen = () => {
    return (
        <Container direction="column" height="100%">
            <Container height="50%">
                <Logo />
            </Container>
            <Container height="50%" width="90%">
                <LinearProgress color={colors.lightGray} />
            </Container>
        </Container>
    )
}

export default SplashScreen
