import {Typography} from "@mui/material";
import {fetchLoadingArtists} from "../Artists/ArtistsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAlbums} from "./AlbumsSlice.ts";
import {fetchAlbums} from "./AlbumsThunk.ts";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import AlbumItem from "./components/AlbumItem.tsx";
import Grid from "@mui/material/Grid";
import { useSearchParams } from "react-router-dom";


const Albums = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(fetchLoadingArtists);
    const [searchParams] = useSearchParams();
    const id_artist = searchParams.get("id_artist");


    useEffect(() => {
        if(id_artist) {
            dispatch(fetchAlbums(id_artist))
        }
    }, [dispatch, id_artist]);

    const artistName = albums.length > 0 ? albums[0].artist.name : '';

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {albums.length > 0 ? (
                        <>
                            <Typography variant="h4" mb={3}>Albums of {artistName}</Typography>
                            <Grid container spacing={2}>
                                {albums.map((album) => (
                                    <AlbumItem
                                        key={album._id}
                                        name={album.name}
                                        year={album.year}
                                        image={album.image}
                                        tracksAmount={album.tracks}
                                        id={album._id}
                                    />
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="body2">No albums yet</Typography>
                    )}
                </>
            )}
        </>
    );
};

export default Albums;