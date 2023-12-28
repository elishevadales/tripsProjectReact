import {createSlice} from "@reduxjs/toolkit"

const initValue = {
    user: {


    }
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: initValue,
    reducers: {
        updateUserInfo: (state, actions) => {
            state.user = { ...actions.payload.update }
        },
        resetUserInfo: (state, actions) => {
            state.user = {}
        }
    }
})


export const { updateUserInfo ,resetUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;