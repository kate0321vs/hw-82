import { createAsyncThunk } from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import {ITrackHistory} from "../../types";

export const trackHistoryFetch = createAsyncThunk<ITrackHistory[], void, {state: RootState}>(
    'trackHistory/fetchAll',
    async (_, thunkAPI) => {
        const usersState = thunkAPI.getState().users;
        const response = await axiosApi.get('track_history',
            {headers: {
                "Authorization": usersState.user?.token,
            },
            });
        return response.data;
    }
)

export const addToHistory = createAsyncThunk<void, string, {state: RootState}>(
    'trackHistory/add',
    async (track, thunkAPI) => {
        const usersState = thunkAPI.getState().users

        await axiosApi.post('/track_history',
            {track},
            {headers:{
                    "Authorization": usersState.user?.token,
                }
            });
    }
);