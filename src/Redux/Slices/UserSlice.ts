import { createSlice } from "@reduxjs/toolkit";
import language from "@Language/language.json"

const userSlice = createSlice({
    name: "user",
    initialState: {
        orderId: "",
        languageType: "English",
        language: language,
        networkStatus: false
    },
    reducers: {
        getOrderId: (state, action) => {
            state.orderId = action.payload
        },
        getLanguage: (state, action) => {
            state.language = action.payload
        },
        setLanguageType: (state, action) => {
            state.languageType = action.payload
        },
        getNetworkStatus: (state, action) => {
            state.networkStatus = action.payload
        }
    },
})


export const { getOrderId, getLanguage, setLanguageType, getNetworkStatus } = userSlice.actions
export default userSlice.reducer