import { createSlice } from "@reduxjs/toolkit"

const ColorSlice = createSlice({
    name: "addProduct",
    initialState: {
        color: {
            primary: "#424874",
            secondary: "#00A7E1",
            light: "#F0F4EF",
            gray: "#454851",
            yellow: "#F3A712",
            red: "#E4572E",
            white: "white",
            map: "#F5FCFF",
            blue: "#81ADC8",
            border: "#D3F3EE",
        },
    },
    reducers: {}
})

export default ColorSlice.reducer