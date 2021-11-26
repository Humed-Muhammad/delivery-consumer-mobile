import Container from '@Components/Atoms/Container'
import { Icons } from '@Components/Atoms/Icons'
import Text from '@Components/Atoms/Text'
import { Divider } from '@Components/Organisms/Divider'
import { useAppSelector } from '@Redux/Hooks'
import { languageData } from '@Redux/MemoizedSelectors'
import { colors } from '@Utils/Color/colors'
import React from 'react'

interface Props {
    arrayOne: Array<Object | string>,
    arrayTwo: Array<Object | string>,
    firstStep: number,
    secondStep: number,
    height: number,
    iconName: string
}

const Stepper = ({ arrayOne, arrayTwo, height, iconName }: Partial<Props>) => {
    const { Order_detail } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)
    return (
        <Container width="100%" align="flex-start" direction="column">
            {
                arrayOne.map((item, index) => (
                    <>
                        <Text key={item} fontWeight="bold"><Icons color={colors.blue} name={iconName || "lens"} /> {Order_detail[languageType].Pickup}: <Text color={colors.secondary}>{item}</Text></Text>
                        <Divider direction="vertical" height={height || 20} thikness={2} width={8} />
                    </>
                ))
            }
            {
                arrayTwo.map((item, index) => (
                    <>
                        <Text key={item} fontWeight="bold">
                            <Icons color={colors.yellow} name={iconName || "lens"} /> {Order_detail[languageType].Dropoff}: <Text color={colors.secondary}>{item}</Text>
                        </Text>
                        {arrayTwo.length > 1 && (<Divider direction="vertical" height={20} thikness={2} width={8} />)}
                    </>
                ))
            }
        </Container>
    )
}

export default React.memo(Stepper)
