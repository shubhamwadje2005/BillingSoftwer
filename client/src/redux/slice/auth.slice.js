import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user"))
    },
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.userLogin.matchFulfilled, (state, { payload }) => {
            state.user = payload;
            localStorage.setItem("user", JSON.stringify(payload));
        })
        .addMatcher(authApi.endpoints.userLogout.matchFulfilled, (state, { payload }) => {
            state.user = null;
            localStorage.removeItem("user");
        })


})

export const { invalidate } = authSlice.actions
export default authSlice.reducer