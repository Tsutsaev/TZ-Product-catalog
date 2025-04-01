import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice.ts";
import searchReducer from "./ searchSlice.ts";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        search: searchReducer,

    },
});

// Типы RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;