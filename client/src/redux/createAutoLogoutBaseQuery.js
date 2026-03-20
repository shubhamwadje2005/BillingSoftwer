import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { toast } from "react-toastify"

export const createAutoLogoutBaseQuery = ({ baseUrl, redirectPath }) => {
    const baseQuery = fetchBaseQuery({ baseUrl, credentials: "include" })

    return async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions)

        if (result.error?.status === 401 || result.error?.status === 403) {

            const message = result.error.data?.message || "Session expired. Please login again."
            toast.error(message)

            setInterval(() => {
                localStorage.clear()
                window.location.replace(redirectPath)
            }, 4000)
        }

        return result
    }
}