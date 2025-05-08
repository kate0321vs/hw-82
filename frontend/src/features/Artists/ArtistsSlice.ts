import {IArtist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {deleteArtist, fetchArtists, makePublish} from "./ArtistsThunk.ts";

interface ArtistsState {
    artists: IArtist[];
    fetchLoading: boolean;
    deleteLoading: boolean | string;
    publishedLoading: boolean | string;
}

const initialState: ArtistsState = {
    artists: [],
    fetchLoading: false,
    deleteLoading: false,
    publishedLoading: false,
}

export const ArtistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
         state.fetchLoading = true;
        });
        builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
            state.fetchLoading = false;
            state.artists = artists;
        });
        builder.addCase(fetchArtists.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(makePublish.pending, (state, action) => {
            state.publishedLoading = action.meta.arg;

        });
        builder.addCase(makePublish.fulfilled, (state) => {
            state.publishedLoading = true;
        });
        builder.addCase(makePublish.rejected, (state) => {
            state.publishedLoading = false;
        });

        builder.addCase(deleteArtist.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteArtist.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteArtist.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const artistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const fetchLoadingArtists = (state: RootState) => state.artists.fetchLoading;
export const selectDeleteArtistLoading = (state: RootState) => state.artists.deleteLoading;
export const selectPublishedLoading = (state: RootState) => state.artists.publishedLoading;