import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {ITrackHistory} from "../../types";
import {addToHistory} from "./TrackHistoryThunk.ts";

interface TrackHistoryState {
    trackHistory: ITrackHistory[];
    fetchLoading: boolean;
}

const initialState: TrackHistoryState = {
    trackHistory: [],
    fetchLoading: false,
}

export const TrackHistorySlice = createSlice({
    name: "trackHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToHistory.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(addToHistory.fulfilled, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(addToHistory.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const trackHistoryReducer = TrackHistorySlice.reducer;
export const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export const fetchLoadingTrackHistory = (state: RootState) => state.trackHistory.fetchLoading