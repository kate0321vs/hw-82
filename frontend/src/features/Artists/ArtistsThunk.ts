import {createAsyncThunk} from "@reduxjs/toolkit";
import {IArtist, IMutationArtist} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const fetchArtists = createAsyncThunk<IArtist[], void ,{state: RootState }>(
    "artists/fetchAll",
    async (_, thunkAPI) => {
        const user = thunkAPI.getState().users.user;
        const response = await axiosApi.get("/artists");
        const artists: IArtist[] = response.data;
        if (user && user.role === "user" || !user) {
            return artists.filter(artist => artist.isPublished);
        }
        return artists;
    }
);

export const createArtist = createAsyncThunk<void, IMutationArtist>(
    "artists/create",
    async (artist) => {
        const formData = new FormData();
        const keys = Object.keys(artist) as (keyof IMutationArtist)[];

        keys.forEach((key) => {
            const value = artist[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });
        await axiosApi.post('/artists', formData);
    }
);

export const deleteArtist = createAsyncThunk<void, string>(
    "artists/delete",
    async (id) => {
        await axiosApi.delete(`artists/${id}`);
    }
);

export const makePublish = createAsyncThunk<void, string>(
    "artists/makePublish",
    async (id) => {
        await axiosApi.patch(`artists/${id}/togglePublished`);
    }
)
