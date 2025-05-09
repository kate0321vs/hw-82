import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IAlbums} from "../../types";
import {RootState} from "../../app/store.ts";

export const fetchAlbums = createAsyncThunk<IAlbums[], string | null, {state: RootState}>(
    "albums/fetchAll",
    async (id_artist, thunkAPI) => {
        const user = thunkAPI.getState().users.user;
        const response = await axiosApi.get('/albums', {
            params: id_artist ? { id_artist } : undefined})
        const albums: IAlbums[] = response.data;
        if (user && user.role === "user" || !user) {
            return albums.filter(album => album.isPublished);
        }
        return albums;
    }
);

export const deleteAlbum = createAsyncThunk<void, string>(
    "albums/delete",
    async (id) => {
        await axiosApi.delete(`albums/${id}`);
    }
);

export const makePublicAlbum = createAsyncThunk<void, string>(
    "albums/makePublish",
    async (id) => {
        await axiosApi.patch(`albums/${id}/togglePublished`);
    }
);