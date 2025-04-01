import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface ProductsState {
    items: Product[];
    selectedProduct: Product | null;
    status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
    items: [],
    selectedProduct: null,
    status: "idle",
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return (await response.json()) as Product[];
});

export const fetchProduct = createAsyncThunk("products/fetchProducts/:id", async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return (await response.json()) as Product[];
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "idle";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(fetchProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = "idle";
                state.items = action.payload;
            })
            .addCase(fetchProduct.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const selectProducts = (state: RootState) => state.products;
export const selectProductById = (state: RootState) => state.products.selectedProduct;
export default productsSlice.reducer;