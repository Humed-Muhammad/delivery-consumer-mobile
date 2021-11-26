import { createSlice } from "@reduxjs/toolkit"

const DropoffSlice = createSlice({
    name: "Dropoff",
    initialState: {
        formData: [],
        status: {
            dropoffModalStatus: false,
            dropoffIconStatus: false,
            dropoffIsChecked: false
        },
        receiver: [],
        dropoffPlace: [],
        dropoffLineCoordinates: [],
        totalDistance: []
    },
    reducers: {
        dropoffToogleModal: (state) => {
            state.status["dropoffModalStatus"] = !state.status.dropoffModalStatus
        },
        dropoffChangeIconStatus: (state) => {
            state.status["dropoffIconStatus"] = true
        },
        addDropoffPlace: (state, action) => {
            state.dropoffPlace.push(action.payload)
        },
        removeDropoffPlace: (state, action) => {
            state.dropoffPlace.splice(action.payload, 1)
        },
        dropoffChangeIsChecked: (state, action) => {
            // if specifically needed to set it to false
            if (action.payload == false) {
                state.status["dropoffIsChecked"] = action.payload
            }

            // other wise it will toogle it
            else {

                state.status["dropoffIsChecked"] = !state.status.dropoffIsChecked
            }
        },
        // Here action is an object
        addReceiver: (state, action) => {
            state.receiver.push(action.payload)
        },

        // Here the action an index of one of the reciver value  
        removeReceiver: (state, action) => {
            state.receiver.splice(action.payload, 1)
        },
        addDropoffLineCoordinates: (state, action) => {
            state.dropoffLineCoordinates.push(action.payload)
        },
        removeDropoffLineCoordinates: (state, action) => {
            state.dropoffLineCoordinates.splice(action.payload, 1)
        },
        getTotalDistance: (state, action) => {
            state.totalDistance.push(action.payload)
        },
        resetDropoff: (state) => {
            state.dropoffPlace = []
            state.totalDistance = []
            state.formData = []
            state.receiver = []
            state.status = {
                dropoffModalStatus: false,
                dropoffIconStatus: false,
                dropoffIsChecked: false
            }
            state.dropoffLineCoordinates = []
        }
    }
})
export const {
    dropoffToogleModal,
    addDropoffPlace,
    removeDropoffPlace,
    dropoffChangeIconStatus,
    dropoffChangeIsChecked,
    addReceiver,
    removeReceiver,
    addDropoffLineCoordinates,
    removeDropoffLineCoordinates,
    getTotalDistance,
    resetDropoff
} = DropoffSlice.actions
export default DropoffSlice.reducer