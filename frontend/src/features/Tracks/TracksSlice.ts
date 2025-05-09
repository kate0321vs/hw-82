import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {ITrack} from "../../types";
import {deleteTrack, fetchTracks, makePublicTrack} from "./TracksThunk.ts";

interface TracksState {
    tracks: ITrack[];
    fetchLoading: boolean;
    publicLoading: boolean | string;
    deleteLoading: boolean | string;
}

const initialState: TracksState = {
    tracks: [],
    fetchLoading: false,
    publicLoading: false,
    deleteLoading: false,
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

        builder.addCase(makePublicTrack.pending, (state, action) => {
            state.publicLoading = action.meta.arg;
        });
        builder.addCase(makePublicTrack.fulfilled, (state) => {
            state.publicLoading = false;
        });
        builder.addCase(makePublicTrack.rejected, (state) => {
            state.publicLoading = false;
        });

        builder.addCase(deleteTrack.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteTrack.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTrack.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const tracksReducer = TracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const fetchLoadingTracks = (state: RootState) => state.tracks.fetchLoading;
export const selectPublicTrackLoader = (state: RootState) => state.tracks.publicLoading;
export const selectDeleteTrackLoader = (state: RootState) => state.tracks.deleteLoading;