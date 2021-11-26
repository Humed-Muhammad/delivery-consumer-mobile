import Container from '@Components/Atoms/Container'
import { colors } from '@Utils/Color/colors'
import React from 'react'
import Text from '@Components/Atoms/Text'

interface Props {
    error: any,
    touched: boolean,
    text: string,
}


const FormError = ({ error, touched }: Partial<Props>) => {
    return (
        <Container width="100%" justify="flex-start" >
            {(error && touched) ? <Text color={colors.red}>{error}</Text> : null}
        </Container>
    )
}

export default FormError
