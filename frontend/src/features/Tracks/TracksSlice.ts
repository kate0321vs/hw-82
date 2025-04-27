import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {ITrack} from "../../types";
import {fetchTracks} from "./TracksThunk.ts";

interface TracksState {
    tracks: ITrack[];
    fetchLoading: boolean;
}

const initialState: TracksState = {
    tracks: [],
    fetchLoading: false,
}

export const TracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
            state.fetchLoading = false;
            state.tracks = tracks;
        });
        builder.addCase(fetchTracks.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const tracksReducer = TracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const fetchLoadingTracks = (state: RootState) => state.tracks.fetchLoading