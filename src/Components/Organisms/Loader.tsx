import Container from '@Components/Atoms/Container'
import React from 'react'
import { Button } from 'react-native-elements'

interface Props {
    height: string,
    width: string
}


const Loader = ({ height, width }: Partial<Props>) => {
    return (
        <Container width={width} height={height || "100%"}>
            <Button type="clear" title="Loading button" loading />
        </Container>
    )
}

export default Loader
