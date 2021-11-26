import CardConatiner from '@Components/Atoms/CardContainer'
import Text from '@Components/Atoms/Text'
import React from 'react'

interface Props {
    amount: number
}

const Badge = ({ amount }: Props) => {
    return (
        <CardConatiner margins="0px" width="30px" height="30px" position="absolute" right="0px" top="0px" radius="50px">
            <Text>{amount}</Text>
        </CardConatiner>
    )
}

export default Badge
