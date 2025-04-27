import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IAlbums} from "../../types";

export const fetchAlbums = createAsyncThunk<IAlbums[], string>(
    "albums/fetchAll",
    async (id_artist?) => {
        const response = await axiosApi.get('/albums', {
            params: id_artist ? { id_artist } : undefined})

        return response.data;
    }
);

