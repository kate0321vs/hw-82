import {
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import {ITrackMutation} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {fetchArtists} from "../../Artists/ArtistsThunk.ts";
import { selectArtists } from '../../Artists/ArtistsSlice.ts';
import { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../Users/usersSlice.ts";
import {selectCreateTrackLoader} from "../TracksSlice.ts";
import {createTrack} from "../TracksThunk.ts";
import {selectAlbums} from "../../Albums/AlbumsSlice.ts";
import {fetchAlbums} from "../../Albums/AlbumsThunk.ts";

const initialState: ITrackMutation = {
    name: '',
    album: '',
    duration: ''
}

const AlbumForm = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const [state, setState] = useState<ITrackMutation>(initialState);
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateTrackLoader);
    const user = useAppSelector(selectUser);
    const [selectedArtist, setSelectedArtist] = useState('');
    let albums = useAppSelector(selectAlbums);

    if (selectedArtist !== '') {
        albums = albums.filter((album) => album.artist._id === selectedArtist);
    }

    if (!user) {
        navigate('/')
    }

    useEffect(() => {
         dispatch(fetchArtists());
         if (selectedArtist) {
             dispatch(fetchAlbums(selectedArtist));
         }
    }, [dispatch, selectedArtist]);


    const onSelectArtists = (e: SelectChangeEvent) => {
        setSelectedArtist(e.target.value)
    }

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createTrack(state));
        toast.success('Track was created Successfully!');
        navigate(`/tracks?id_album=${state.album}`);
        setState(initialState);
        setSelectedArtist('');
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid>
                    <TextField
                        id="name"
                        label="Name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        name="name"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <FormControl fullWidth required>
                        <InputLabel id="artist-label">Artist</InputLabel>
                        <Select
                            labelId="artist-label"
                            id="artist"
                            name="artist"
                            value={selectedArtist}
                            onChange={onSelectArtists}
                            label="Artist"
                        >
                            {artists.map((artist) => (
                                <MenuItem key={artist._id} value={artist._id}>
                                    {artist.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <FormControl fullWidth required>
                        <InputLabel id="album-label">Album</InputLabel>
                        <Select
                            labelId="album-label"
                            id="album"
                            name="album"
                            value={state.album}
                            onChange={inputChangeHandler}
                            label="Album"
                            disabled={!selectedArtist}
                        >
                            {albums.map((album) => (
                                <MenuItem key={album._id} value={album._id}>
                                    {album.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <TextField
                        id="duration"
                        label="duration"
                        value={state.duration}
                        onChange={inputChangeHandler}
                        name="duration"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <Button
                        endIcon={loading ? <CircularProgress size={24}/> : <SendIcon/>}
                        size="small"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        sx={{backgroundColor: 'orangered', fontWeight: '500'}}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
};

export default AlbumForm;


