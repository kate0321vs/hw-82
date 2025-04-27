import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {IAlbums} from "../../types";
import {fetchAlbums} from "./AlbumsThunk.ts";

interface AlbumsState {
    albums: IAlbums[];
    fetchLoading: boolean;
}

const initialState: AlbumsState = {
    albums: [],
    fetchLoading: false,
}

export const AlbumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
            state.fetchLoading = false;
            state.albums = albums;
        });
        builder.addCase(fetchAlbums.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const albumsReducer = AlbumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const fetchLoadingAlbums = (state: RootState) => state.albums.fetchLoading