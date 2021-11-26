import { createSlice } from "@reduxjs/toolkit"

const PickupSllice = createSlice({
    name: "Pickup",
    initialState: {
        status: {
            pickupModalStatus: false,
            pickUpIconStatus: false,
            pickupIsChecked: false
        },
        sender: [

        ],
        pickupPlace: [

        ],
        vehicleId: "",
        userLocations: {
            currentLocation: {
                latitude: 8.9950409,
                longitude: 38.7850037,
                latitudeDelta: 0.021064477015438204,
                longitudeDelta: 0.02132675609124921,
            },
            selectedLocations: []
        },
        pickupLineCoordinates: []
    },
    reducers: {
        pickupToogleModal: (state) => {
            state.status["pickupModalStatus"] = !state.status.pickupModalStatus
        },
        pickupChangeIconStatus: (state) => {
            state.status["pickUpIconStatus"] = true
        },
        pickupChangeIsChecked: (state, action) => {
            if (action.payload == false) {
                state.status["pickupIsChecked"] = action.payload
            } else {

                state.status["pickupIsChecked"] = !state.status.pickupIsChecked
            }
        },
        handlePickupSender: (state: any, action) => {
            state.sender.push(action.payload);
        },
        removeSender: (state, action) => {
            state.sender.splice(action.payload, 1)
        },
        getVehicleId: (state, action) => {
            state.vehicleId = action.payload
        },
        pickupAddPickupPlace: (state, action) => {
            state.pickupPlace = [...state.pickupPlace, action.payload]

        },
        reorderPickupPlaces: (state, action) => {
            state.pickupPlace = action.payload

        },
        pickupRemovePickupPlace: (state, action) => {
            const newState = [...state.pickupPlace]
            newState.splice(action.payload, 1)
            state.pickupPlace = newState
        },
        getUserCurrentLocation: (state, action) => {
            state.userLocations.currentLocation = action.payload
        },
        addSelectedLocation: (state, action) => {
            state.userLocations.selectedLocations.push(action.payload)
        },
        removeSelectedLocation: (state, action) => {
            state.userLocations.selectedLocations.splice(action.payload, 1)
        },
        addPickupLineCoordinates: (state, action) => {
            state.pickupLineCoordinates.push(action.payload)
        },
        removePickupLineCoordinates: (state, action) => {
            state.pickupLineCoordinates.splice(action.payload, 1)
        },
        resetPickup: (state) => {
            state.status = {
                pickupModalStatus: false,
                pickUpIconStatus: false,
                pickupIsChecked: false
            }
            state.pickupLineCoordinates = []
            state.pickupPlace = []
            state.sender = []
            state.userLocations = {
                currentLocation: {
                    latitude: 8.9950409,
                    longitude: 38.7850037,
                    latitudeDelta: 0.021064477015438204,
                    longitudeDelta: 0.02132675609124921,
                },
                selectedLocations: []
            }
            state.vehicleId = ""
        }
    }
})
export const {
    pickupToogleModal,
    getUserCurrentLocation,
    addSelectedLocation,
    removeSelectedLocation,
    pickupAddPickupPlace,
    pickupChangeIconStatus,
    pickupRemovePickupPlace,
    pickupChangeIsChecked,
    handlePickupSender,
    removeSender,
    getVehicleId,
    reorderPickupPlaces,
    addPickupLineCoordinates,
    removePickupLineCoordinates,
    resetPickup
} = PickupSllice.actions

export default PickupSllice.reducer