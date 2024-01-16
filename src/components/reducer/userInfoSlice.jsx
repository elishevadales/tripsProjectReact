import { createSlice } from "@reduxjs/toolkit"


const initValue = {
    user: {

    },
    notifications: false
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: initValue,
    reducers: {
        updateUserInfo: (state, action) => {
            state.user = { ...action.payload.update }
        },
        resetUserInfo: (state, action) => {
            state.user = {}
        },
        updateProfileImg: (state, action) => {
            state.user = {
                ...state.user,
                profile_image: action.payload.profile_image
            };
        },
        updateBackgroundImg: (state, action) => {
            state.user = {
                ...state.user,
                background_image: action.payload.background_image
            };
        },
        updateNotification: (state, action) => {
            state.notifications = action.payload.notification
        },

    }
})


export const { updateUserInfo, resetUserInfo, updateProfileImg, updateBackgroundImg, updateNotification } = userInfoSlice.actions;
export default userInfoSlice.reducer;