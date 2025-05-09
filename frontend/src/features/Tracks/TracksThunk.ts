import {createAsyncThunk} from "@reduxjs/toolkit";
import { ITrack } from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const fetchTracks = createAsyncThunk<ITrack[], string | null, { state: RootState }>(
    "tracks/fetchAll",
    async (id_album, thunkAPI) => {
        const user = thunkAPI.getState().users.user;
        const response = await axiosApi.get("/tracks", {
            params: id_album ? { id_album } : undefined});
        const tracks: ITrack[] = response.data;
        if (user && user.role === "user" || !user) {
            return tracks.filter(track => track.isPublished);
        }
        return tracks;
    }
);

export const deleteTrack = createAsyncThunk<void, string>(
    "tracks/delete",
    async (id) => {
        await axiosApi.delete(`tracks/${id}`);
    }
);

export const makePublicTrack = createAsyncThunk<void, string>(
    "tracks/makePublish",
    async (id) => {
        await axiosApi.patch(`tracks/${id}/togglePublished`);
    }
);



