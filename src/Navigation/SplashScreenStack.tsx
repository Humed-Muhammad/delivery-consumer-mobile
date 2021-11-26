import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screenList } from "@Routes/SplashStckList"


const Stack = createNativeStackNavigator();

const screens = screenList.map((item: any, index) => (
    <Stack.Screen
        key={index}
        name={item.name}
        component={item.component}
        options={{
            headerShown: false
        }}
    />
))

export const SplashScreenStack = () => {
    return (
        <Stack.Navigator>
            {screens}
        </Stack.Navigator>
    )
}