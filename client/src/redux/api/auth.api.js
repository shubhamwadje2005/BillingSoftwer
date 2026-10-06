import { createApi } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "../createAutoLogoutBaseQuery"

const getBaseServer = () => {
    if (typeof window !== "undefined") {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.port === "5173" || window.location.hostname.startsWith("192.168.")) {
            return "http://localhost:5000";
        }
    }
    return import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
};

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `${getBaseServer()}/api/auth`,
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
                transformResponse: data => {
                    return data?.result || data;
                },
                invalidatesTags: ["auth"]
            }),

            userLogout: builder.mutation({
                query: () => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    return data?.result || data;
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
