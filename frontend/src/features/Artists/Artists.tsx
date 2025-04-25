import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchLoadingArtists, selectArtists} from "./ArtistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "./ArtistsThunk.ts";
import ArtistItem from "./components/ArtistItem.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const loading = useAppSelector(fetchLoadingArtists);

    useEffect(() => {
        dispatch(fetchArtists())
    }, [dispatch])

    return (
        <>
            <Typography variant='h4' mb={3}>Artists</Typography>
            <Grid container spacing={2}>
                {loading ? (
                    <Spinner />
                ) : artists && artists.length > 0 ? (
                    artists.map((artist) => (
                        <ArtistItem
                            image={artist.image}
                            key={artist._id}
                            id={artist._id}
                            name={artist.name}
                        />
                    ))
                ) : (
                    <Typography variant="body2">No artists yet</Typography>
                )}
            </Grid>
        </>

    );
};

export default Artists;