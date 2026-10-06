import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { toast } from "react-toastify"
import { logout } from "./slice/auth.slice"

let isLoggingOut = false;

export const createAutoLogoutBaseQuery = ({ baseUrl, redirectPath = "/login" }) => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            let token = null;
            const state = getState();
            if (state?.auth?.user?.token) {
                token = state.auth.user.token;
            } else {
                try {
                    const savedToken = localStorage.getItem("token");
                    if (savedToken) {
                        token = savedToken;
                    } else {
                        const savedUser = JSON.parse(localStorage.getItem("user") || "null");
                        token = savedUser?.token;
                    }
                } catch {
                    // ignore JSON parse error
                }
            }

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    });

    return async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result.error && (result.error.status === 401 || result.error.status === 403)) {
            const url = typeof args === "string" ? args : (args?.url || "");
            const isAuthRoute = url.includes("/login") || url.includes("/register") || url.includes("/check-email-config");

            // Never auto-logout or reload page on login/register mutation failures!
            if (!isAuthRoute) {
                if (!isLoggingOut) {
                    isLoggingOut = true;
                    api.dispatch(logout());

                    const message = result.error.data?.message || "Session expired. Please login again.";
                    toast.error(message);

                    setTimeout(() => {
                        isLoggingOut = false;
                        if (typeof window !== "undefined" && window.location.pathname !== redirectPath) {
                            window.location.replace(redirectPath);
                        }
                    }, 1000);
                }
            }
        }

        return result;
    };
};