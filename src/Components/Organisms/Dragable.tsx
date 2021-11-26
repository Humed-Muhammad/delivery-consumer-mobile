import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import DraggableFlatList, {
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { pickupPlaces } from "@Redux/MemoizedSelectors";
import { useAppSelector, useAppDispatch } from "@Redux/Hooks";
import { reorderPickupPlaces } from "@Redux/Slices/PickUpSlice";
import CardConatiner from "@Components/Atoms/CardContainer";
import { Icons } from "@Components/Atoms/Icons";
import { colors } from "@Utils/Color/colors";
import Text from "@Components/Atoms/Text";

type NewItem = {
    key: string;
    mainLocation: string;
    latitude: number;
    longitude: number;
    specificLocation: string;
}


export default function App() {
    const dispatch = useAppDispatch()
    const places = useAppSelector(pickupPlaces)
    console.log("redux places " + JSON.stringify(places))

    const renderItem = ({ item, drag, isActive }: RenderItemParams<NewItem>) => {
        return (
            <TouchableOpacity
                onLongPress={drag}
                disabled={isActive}
            >
                <CardConatiner padd="10px" key={item} bg={isActive ? colors.red : colors.gray} justify="space-around" height="70px" width="50px">
                    <Text color={colors.white} bg="gray" key={item} fontSize="12px" fontWeight="bold" >{item && item.mainLocation}</Text>
                    <Icons style={null} onPress color={colors.white} size={17} name="close" />
                </CardConatiner>
            </TouchableOpacity>
        );
    };

    return (

        <DraggableFlatList
            data={places}
            onDragEnd={({ data }) => {
                dispatch(reorderPickupPlaces(data))
                console.log("Return data " + JSON.stringify(data))
            }}
            keyExtractor={(item) => item.mainLocation}
            renderItem={renderItem}
            scrollEnabled
            horizontal
            activationDistance={2}
            dragHitSlop={{
                horizontal: 2
            }}

            style={{
                width: "100%"
            }}

        />

    );
}

