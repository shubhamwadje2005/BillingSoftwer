import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";

const getSavedUser = () => {
    try {
        const item = localStorage.getItem("user");
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
};

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: getSavedUser()
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.userLogin.matchFulfilled, (state, { payload }) => {
            const user = payload?.result || payload;
            state.user = user;
            if (user?.token) {
                localStorage.setItem("token", user.token);
            }
            localStorage.setItem("user", JSON.stringify(user));
        })
        .addMatcher(authApi.endpoints.userLogout.matchFulfilled, (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        })
});

export const { logout, invalidate } = authSlice.actions;
export default authSlice.reducer;