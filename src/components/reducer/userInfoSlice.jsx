import { createSlice } from "@reduxjs/toolkit"


const initValue = {
    user: {

    }
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
    }
})


export const { updateUserInfo, resetUserInfo, updateProfileImg,updateBackgroundImg } = userInfoSlice.actions;
export default userInfoSlice.reducer;