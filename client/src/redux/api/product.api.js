import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "../createAutoLogoutBaseQuery"

export const productApi = createApi({
    reducerPath: "productApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/productbill", credentials: 'include' }),
    baseQuery: createAutoLogoutBaseQuery({
        // baseUrl: "http://localhost:5000/api/productbill",
        baseUrl: "https://billing-softwer-server.vercel.app/api/productbill",
        redirectPath: "/login"
    }),
    tagTypes: ["product"],
    endpoints: (builder) => {
        return {
            getProduct: builder.query({
                query: (dataGet) => {
                    return {
                        url: "/get/productbills",
                        method: "GET",
                        params: dataGet
                    }
                },
                providesTags: ["product"]
            }),
            addProduct: builder.mutation({
                query: productData => {
                    return {
                        url: "/add/productbills",
                        method: "POST",
                        body: productData
                    }
                },
                invalidatesTags: ["product"]
            }),
            deleteProduct: builder.mutation({
                query: (id) => {
                    return {
                        url: "/delete/productbills/" + id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["product"]
            }),



            // isSoftDelete 
            getIsSoftDeleteProduct: builder.query({
                query: (data) => {
                    return {
                        url: "/get/issoftDelete/productbills",
                        method: "GET",
                        params: data
                    }
                },
                providesTags: ["product"]
            }),

            restoreProduct: builder.mutation({
                query: (id) => {
                    return {
                        url: "/restore/productbills/" + id,
                        method: "PATCH",
                    }
                },
                invalidatesTags: ["product"]
            }),

        }
    }
})

export const {
    useLazyGetProductQuery,
    useAddProductMutation,
    useDeleteProductMutation,

    useLazyGetIsSoftDeleteProductQuery,
    useRestoreProductMutation,
} = productApi
