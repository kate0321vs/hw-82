import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITrack} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchTracks = createAsyncThunk<ITrack[], string>(
    "tracks/fetchAll",
    async (id_album?) => {
        const response = await axiosApi.get("/tracks", {
            params: id_album ? { id_album } : undefined});
        return response.data;
    }
);



