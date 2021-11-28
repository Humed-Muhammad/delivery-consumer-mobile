import { createSlice } from "@reduxjs/toolkit";

const VehicleSlice = createSlice({
    name: "vehicle",
    initialState: {
        vehicleList: [
            {
                uri: "https://images.unsplash.com/photo-1471466054146-e71bcc0d2bb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
                status: true,
                id: 1,
            },
            {
                uri: "https://img.favpng.com/2/23/2/toyota-vitz-toyota-aygo-car-toyota-avensis-png-favpng-WJ5EPmpHBr2bgbSHVwaXLLJk4.jpg",
                status: false,
                id: 2,
            },
            {
                uri: "https://img.favpng.com/15/9/8/2018-toyota-corolla-2017-toyota-corolla-car-2007-toyota-corolla-png-favpng-T0JG8SV7AcGAmbVQJh4X8pdYZ.jpg",
                status: false,
                id: 3,
            },
            {
                uri: "https://img.favpng.com/17/14/9/commercial-vehicle-car-south-africa-pickup-truck-png-favpng-JzveXKfAWcNfUaqXtMDupzZyT.jpg",
                status: false,
                id: 4,
            }]
    },
    reducers: {

    }
})

export const { } = VehicleSlice.actions

export default VehicleSlice.reducer