import Container from '@Components/Atoms/Container';
import { colors } from '@Utils/Color/colors';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#fe7013',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
};

const OrderTrack = ({ position }) => {
    const data = ["pending", "confirmed", "on the way", "deliverd"];

    return (
        <View style={styles.stepIndicator}>
            <StepIndicator
                customStyles={stepIndicatorStyles}
                stepCount={4}
                direction="vertical"
                currentPosition={data.indexOf(position)}
                labels={data.map((item) => item)}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    stepIndicator: {
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 200,
        width: "100%"
    },
})

export default OrderTrack
