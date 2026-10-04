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

export const billApi = createApi({
    reducerPath: "billApi",
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `${getBaseServer()}/api/bills`,
        redirectPath: "/login"
    }),
    tagTypes: ["bill"],
    endpoints: (builder) => {
        return {
            getBills: builder.query({
                query: () => {
                    return {
                        url: "/biil",
                        method: "GET",
                    }
                },
                providesTags: ["bill"]
            }),
            addBills: builder.mutation({
                query: billsData => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: billsData
                    }
                },
                invalidatesTags: ["bill"]
            }),
            updateBills: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/bill/${id}`,
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags: ["Bill"],
            }),

            deleteBills: builder.mutation({
                query: (id) => {
                    return {
                        url: `/bill/deleteproduct/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["bill"]
            }),

            getdeleteBills: builder.query({
                query: data => {
                    return {
                        url: "/bill/deleted-product",
                        method: "GET",
                        params: data
                    }
                },
                providesTags: ["bill"],
            }),

            restoredeleteBills: builder.mutation({
                query: (id) => {
                    return {
                        url: `/bill/restore/${id}`,
                        method: "PATCH",
                    }
                },
                invalidatesTags: ["bill"]
            }),

            getPaginationBills: builder.query({
                query: billData => {
                    return {
                        url: "/bill/getPagination",
                        method: "GET",
                        params: billData
                    }
                },
                providesTags: ["bill"],
            }),


            // dashbords page api
            getBillsTotal: builder.query({
                query: filterData => {
                    return {
                        url: "/bill/lifetime",
                        method: "GET",
                        params: filterData
                    }
                },
                providesTags: ["bill"]
            }),
        }
    }
})

export const {
    useGetBillsQuery,
    useAddBillsMutation,
    useUpdateBillsMutation,
    useDeleteBillsMutation,

    useLazyGetdeleteBillsQuery,
    useLazyGetPaginationBillsQuery,
    useRestoredeleteBillsMutation,

    useGetBillsTotalQuery
} = billApi
