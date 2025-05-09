import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {IAlbums} from "../../types";
import {deleteAlbum, fetchAlbums, makePublicAlbum} from "./AlbumsThunk.ts";

interface AlbumsState {
    albums: IAlbums[];
    fetchLoading: boolean;
    publicLoading: boolean | string;
    deleteLoading: boolean | string
}

const initialState: AlbumsState = {
    albums: [],
    fetchLoading: false,
    publicLoading: false,
    deleteLoading: false
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

        builder.addCase(makePublicAlbum.pending, (state, action) => {
            state.publicLoading = action.meta.arg;
        });
        builder.addCase(makePublicAlbum.fulfilled, (state) => {
            state.publicLoading = false;
        });
        builder.addCase(makePublicAlbum.rejected, (state) => {
            state.publicLoading = false;
        });

        builder.addCase(deleteAlbum.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteAlbum.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteAlbum.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const albumsReducer = AlbumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const fetchLoadingAlbums = (state: RootState) => state.albums.fetchLoading;
export const selectPublicAlbumLoader = (state: RootState) => state.albums.publicLoading;
export const selectDeleteAlbumLoader = (state: RootState) => state.albums.deleteLoading;