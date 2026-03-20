import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import authSlice from "./slice/auth.slice"
import { billApi } from "./api/bill.api";
import { productApi } from "./api/product.api";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [billApi.reducerPath]: billApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        auth: authSlice,
    },
    middleware: def => [...def(), authApi.middleware, billApi.middleware, productApi.middleware]
})

export default reduxStore