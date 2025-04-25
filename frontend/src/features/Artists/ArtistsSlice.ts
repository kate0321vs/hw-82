import {IArtist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

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

});

export const artistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const fetchLoadingArtists = (state: RootState) => state.artists.fetchLoading