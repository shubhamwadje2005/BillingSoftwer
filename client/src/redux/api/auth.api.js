import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "../createAutoLogoutBaseQuery"

export const authApi = createApi({
    reducerPath: "authApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth", credentials: "include" }),
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: "https://billing-softwer-server.vercel.app/api/auth",
        redirectPath: "/login"
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            userRegister: builder.mutation({
                query: (formData) => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: formData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            userLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformErrorResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data))
                    return data
                },
                invalidatesTags: ["auth"]
            }),

            userLogout: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                        // body: userData
                    }
                },
                transformErrorResponse: data => {
                    localStorage.removeItem("user")
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),





            usergetprofile: builder.query({
                query: () => {
                    return {
                        url: "/get",
                        method: "GET",
                    }
                },
                providesTags: ["auth"]
            }),
            userUpdateprofile: builder.mutation({
                query: (profileData) => {
                    return {
                        url: "/profile-update",
                        method: "PATCH",
                        body: profileData,
                    }
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useUserLogoutMutation,

    useUsergetprofileQuery,
    useUserUpdateprofileMutation,
} = authApi
