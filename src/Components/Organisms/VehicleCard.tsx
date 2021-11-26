import React, { useEffect } from 'react'
import { TouchableHighlight } from "react-native"
import CardConatiner from '@Components/Atoms/CardContainer'
import Image from '@Components/Atoms/Image'
import { colors } from '@Utils/Color/colors'
import { getVehicleId } from '@Redux/Slices/PickUpSlice'
import { useAppDispatch } from '@Redux/Hooks'
import { handleVehicleClick } from "@Redux/Slices/VehiclesSlice"

const VehicleCard = ({ index, item }) => {
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (item.status) {
            dispatch(getVehicleId(item.id))
        }
    }, [])

    return (
        <TouchableHighlight underlayColor={colors.white} onPress={() => {
            dispatch(handleVehicleClick(index))
            dispatch(getVehicleId(item.id))
        }} >
            <CardConatiner borderTopWidth={item.status && "3px"} borderColor={item.status && colors.gray} padd="10px" justify="space-around" width="120px" height="90px">
                <Image imageWidth={100} source={{
                    uri: `${item.uri}`,
                }} />
            </CardConatiner>

        </TouchableHighlight>
    )
}



export default React.memo(VehicleCard)
