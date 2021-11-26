import { PermissionsAndroid } from "react-native"


export const requestGeolocationAccess = async () => {
    try {
        const accessGrante = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "EasyDelivery",
                message:
                    "EasyDelivery needs access to your Location ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (accessGrante === PermissionsAndroid.RESULTS.GRANTED) {
            return true
            // console.log("You can use the location");
        } else {
            return false
        }
    } catch (error) {
        console.log(error)

    }
}
