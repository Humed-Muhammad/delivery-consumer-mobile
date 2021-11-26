import React from 'react'
import { Alert } from 'react-native'

const AlertComponent = (title, message, pressOk) => {
    return (
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => pressOk() }
            ]
        )
    )
}

export default AlertComponent
