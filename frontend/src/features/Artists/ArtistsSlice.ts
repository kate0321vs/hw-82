import {IArtist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchArtists} from "./ArtistsThunk.ts";

interface ArtistsState {
    artists: IArtist[];
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    artists: [],
    fetchLoading: false,
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
    }
});

export const artistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const fetchLoadingArtists = (state: RootState) => state.artists.fetchLoading