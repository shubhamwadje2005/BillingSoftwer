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

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: getBaseServer(),
        redirectPath: "/login"
    }),
    tagTypes: ["product", "clothItem"],
    endpoints: (builder) => ({
        // Cloth / Inventory Product Endpoints
        getAllClothProducts: builder.query({
            query: (params) => ({
                url: "/api/products/all",
                method: "GET",
                params: params,
            }),
            providesTags: ["clothItem"]
        }),

        addClothProduct: builder.mutation({
            query: (productData) => ({
                url: "/api/products/add",
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["clothItem", "product"]
        }),

        updateClothProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["clothItem"]
        }),

        deleteClothProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["clothItem"]
        }),

        getDeletedClothProducts: builder.query({
            query: (params) => ({
                url: "/api/products/deleted",
                method: "GET",
                params: params,
            }),
            providesTags: ["clothItem"]
        }),

        restoreClothProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/restore/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["clothItem"]
        }),

        // Legacy Product Bill Endpoints
        getProduct: builder.query({
            query: (dataGet) => ({
                url: "/api/productbill/get/productbills",
                method: "GET",
                params: dataGet
            }),
            providesTags: ["product"]
        }),

        addProduct: builder.mutation({
            query: (productData) => ({
                url: "/api/productbill/add/productbills",
                method: "POST",
                body: productData
            }),
            invalidatesTags: ["product"]
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: "/api/productbill/delete/productbills/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["product"]
        }),

        getIsSoftDeleteProduct: builder.query({
            query: (data) => ({
                url: "/api/productbill/get/issoftDelete/productbills",
                method: "GET",
                params: data
            }),
            providesTags: ["product"]
        }),

        restoreProduct: builder.mutation({
            query: (id) => ({
                url: "/api/productbill/restore/productbills/" + id,
                method: "PATCH",
            }),
            invalidatesTags: ["product"]
        }),
    })
})

export const {
    useGetAllClothProductsQuery,
    useLazyGetAllClothProductsQuery,
    useAddClothProductMutation,
    useUpdateClothProductMutation,
    useDeleteClothProductMutation,
    useGetDeletedClothProductsQuery,
    useLazyGetDeletedClothProductsQuery,
    useRestoreClothProductMutation,

    useLazyGetProductQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useLazyGetIsSoftDeleteProductQuery,
    useRestoreProductMutation,
} = productApi
