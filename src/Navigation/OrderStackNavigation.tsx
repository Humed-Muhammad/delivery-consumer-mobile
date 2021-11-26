import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screenList } from "@Routes/OrderStackNavigationList"
import { Icons } from "@Components/Atoms/Icons";
import { colors } from "@Utils/Color/colors";

const Stack = createNativeStackNavigator();



const style = {
    backgroundColor: colors.white,
    height: 45,
    width: 45,
    borderRadius: 50,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    offSet: { width: -2, height: 4 },
    elevation: 5
}

const screens = screenList.map((item: any, index) => (
    <Stack.Screen
        key={index}
        name={item.name}
        component={item.component}
        options={{
            headerShown: false,
        }}
    />
))

export const OrderStackNavigation = () => {
    return (
        <Stack.Navigator>
            {screens}
        </Stack.Navigator>
    )
}