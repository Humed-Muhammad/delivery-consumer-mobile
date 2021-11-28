import React, { useEffect } from 'react'
import { TouchableHighlight } from "react-native"
import CardConatiner from '@Components/Atoms/CardContainer'
import Image from '@Components/Atoms/Image'
import { colors } from '@Utils/Color/colors'
import { getVehicleId } from '@Redux/Slices/PickUpSlice'
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'

const VehicleCard = ({ index, item }) => {
    const dispatch = useAppDispatch()
    const selectedVehicleId = useAppSelector(state => state.pickup.vehicleId)


    useEffect(() => {
        if (item.status) {
            dispatch(getVehicleId(item.id))
        }
    }, [])

    return (
        <TouchableHighlight key={item.id} underlayColor={colors.white} onPress={() => {
            dispatch(getVehicleId(item.id))
        }} >
            <CardConatiner borderTopWidth={(selectedVehicleId === item.id) && "3px"} borderColor={(selectedVehicleId === item.id) && colors.gray} padd="10px" justify="space-around" width="120px" height="90px">
                <Image imageWidth={100} source={{
                    uri: `${item.uri}`,
                }} />
            </CardConatiner>

        </TouchableHighlight>
    )
}



export default React.memo(VehicleCard)
