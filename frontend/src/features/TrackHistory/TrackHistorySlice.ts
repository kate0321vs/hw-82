import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {ITrackHistory} from "../../types";
import {addToHistory, trackHistoryFetch} from "./TrackHistoryThunk.ts";

interface TrackHistoryState {
    trackHistory: ITrackHistory[];
    addLoading: boolean;
    fetchLoading: boolean;
}

const initialState: TrackHistoryState = {
    trackHistory: [],
    addLoading: false,
    fetchLoading: false,
}

export const TrackHistorySlice = createSlice({
    name: "trackHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToHistory.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(addToHistory.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(addToHistory.rejected, (state) => {
            state.addLoading = false;
        });

        builder.addCase(trackHistoryFetch.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(trackHistoryFetch.fulfilled, (state, {payload: trackHistory}) => {
            state.fetchLoading = false;
            state.trackHistory = trackHistory;
        });
        builder.addCase(trackHistoryFetch.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const trackHistoryReducer = TrackHistorySlice.reducer;
export const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export const fetchLoadingTrackHistory = (state: RootState) => state.trackHistory.fetchLoading