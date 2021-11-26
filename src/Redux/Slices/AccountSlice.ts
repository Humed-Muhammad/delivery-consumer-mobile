import { createSlice } from "@reduxjs/toolkit";



const AccountSlice = createSlice({
    name: "Account",
    initialState: {
        loggedIn: {
            status: false
        },
        userProfileData: {
        },
        userId: "",
    },
    reducers: {
        loggeIn: (state, action) => {
            state.loggedIn["status"] = action.payload
        },
        changeProfileImage: (state, action) => {
            state.userProfileData["profileImage"] = action.payload;
        },
        getUserId: (state, action) => {
            state.userId = action.payload
        },
        getUserProfileData: (state, action) => {
            state.userProfileData = action.payload
        }

    }
})


export const {
    loggeIn,
    changeProfileImage,
    getUserId,
    getUserProfileData
} = AccountSlice.actions

export default AccountSlice.reducer