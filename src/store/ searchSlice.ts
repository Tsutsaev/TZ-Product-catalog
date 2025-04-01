import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "./store.ts";

interface SearchState {
    query: string;
}

const initialState: SearchState = {
    query: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchQuery: (state:SearchState, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
    },
});

export const { setSearchQuery } = searchSlice.actions;
export const selectSearchQuery = (state: RootState) => state.search.query;
export default searchSlice.reducer;