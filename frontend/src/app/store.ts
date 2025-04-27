import { configureStore } from '@reduxjs/toolkit';
import {artistsReducer} from "../features/Artists/ArtistsSlice.ts";
import {albumsReducer} from "../features/Albums/AlbumsSlice.ts";
import {tracksReducer} from "../features/Tracks/TracksSlice.ts";


export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;