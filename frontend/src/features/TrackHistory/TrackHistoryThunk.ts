import { createAsyncThunk } from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";

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