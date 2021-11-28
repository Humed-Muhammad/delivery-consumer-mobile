import React from 'react'
import Container from '@Components/Atoms/Container'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps"
import { StyleSheet } from 'react-native'
import { colors } from '@Utils/Color/colors'
import { useAppSelector, useAppDispatch } from "@Redux/Hooks"
import { dropoffPlaces, pickupPlaces, pickupLineCoordinates, dropoffLineCoordinates } from "@Redux/MemoizedSelectors"

const Map = () => {
    const { currentLocation } = useAppSelector((state: any) => state.pickup.userLocations)
    const pickup = useAppSelector(pickupPlaces)
    const dropoff = useAppSelector(dropoffPlaces)
    const pickupCoordinate = useAppSelector(pickupLineCoordinates)
    const dropoffCoordinate = useAppSelector(dropoffLineCoordinates)

    let lineCoordinate = []
    const distance = []
    if (pickup.length >= dropoff.length) {
        lineCoordinate = [...pickupCoordinate, ...dropoffCoordinate]
    } else {
        lineCoordinate = [...dropoffCoordinate, ...pickupCoordinate]
    }

    return (
        <Container direction="column" justify="flex-start" bg={colors.map} height="100%" width="100%">
            <MapView
                zoomEnabled
                // ref={(ref: any) => ref.fitToSuppliedMarkers(array)}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // onRegionChangeComplete={(region) => {
                //     console.log(region)
                //     dispatch(getUserCurrentLocation(region))
                // }}
                region={currentLocation}
                followsUserLocation={false}
            >
                {
                    pickup.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                            image={{ uri: "https://img.icons8.com/ios-filled/100/000000/marker-p.png" }}

                        />
                    ))

                }
                {
                    dropoff.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                            image={{ uri: "https://img.icons8.com/ios-filled/100/000000/marker-d.png" }}

                        />
                    ))
                }
                <Polyline
                    geodesic
                    coordinates={lineCoordinate}
                    lineJoin="round"
                    strokeWidth={2}
                />
            </MapView>

        </Container>
    )
}


const styles = StyleSheet.create({

    map: {
        position: "absolute",
        top: 0,
        bottom: -25,
        left: 0,
        right: 0,

    },
});

export default React.memo(Map)
