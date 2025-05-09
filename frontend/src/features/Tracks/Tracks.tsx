import {List, Typography} from "@mui/material";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchLoadingTracks, selectTracks} from "./TracksSlice.ts";
import {fetchTracks} from "./TracksThunk.ts";
import {useSearchParams} from "react-router-dom";
import TrackItem from "./components/TrackItem.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {addToHistory} from "../TrackHistory/TrackHistoryThunk.ts";

const Tracks = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const loading = useAppSelector(fetchLoadingTracks);
    const [searchParams] = useSearchParams();
    const id_album = searchParams.get("id_album");

    useEffect(() => {
        if (id_album) {
            dispatch(fetchTracks(id_album));
        }
    }, [dispatch, id_album]);

    const albumName = tracks.length > 0 ? tracks[0].album.name : '';
    const artistName = tracks.length > 0 ? tracks[0].album.artist.name : '';

    const addToHistoryTrack = (track: string) => {
        dispatch(addToHistory(track))
    }

    return (
        loading ? (
            <Spinner/>
        ) : (
            <>
                {tracks.length > 0 ? (
                    <>
                        <h2>{artistName}</h2>
                        <h3>Album: {albumName}</h3>
                        <List>
                            {tracks && tracks.map((track) => (
                                <TrackItem
                                    key={track._id}
                                    number={track.number}
                                    name={track.name}
                                    duration={track.duration}
                                    addToTrackHistory={() => addToHistoryTrack(track._id)}
                                    isPublished={track.isPublished}
                                    id={track._id}
                                    albumId={id_album}
                                />
                            ))}
                        </List>
                    </>
                ) : <Typography>No tracks yet</Typography>
                }

            </>
        )
    );
}

export default Tracks;