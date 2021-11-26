import { configureStore } from "@reduxjs/toolkit"
import color from "@Redux/Slices/ColorSlice"
import report from "@Redux/Slices/ReportSlice"
import pickup from "@Redux/Slices/PickUpSlice"
import account from "@Redux/Slices/AccountSlice"
import dropoff from "@Redux/Slices/DropoffSlice"
import vehicleList from "@Redux/Slices/VehiclesSlice"
import user from "@Redux/Slices/UserSlice"
import order from "@Redux/Slices/OrderSlice"

export const store = configureStore({
    reducer: {
        color,
        report,
        pickup,
        account,
        dropoff,
        vehicleList,
        user,
        order
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;