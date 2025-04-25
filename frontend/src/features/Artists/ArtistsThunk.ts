import {createAsyncThunk} from "@reduxjs/toolkit";
import {IArtist} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchArtists = createAsyncThunk<IArtist[]>(
    "artists/fetchAll",
    async () => {
        const response = await axiosApi.get("/artists");
        return response.data;
    }
);

