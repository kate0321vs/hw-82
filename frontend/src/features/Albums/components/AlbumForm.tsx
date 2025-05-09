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
import {IAlbumMutation} from "../../../types";
import FileInput from '../../../components/UI/FileInput/FileInput';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {fetchArtists} from "../../Artists/ArtistsThunk.ts";
import { selectArtists } from '../../Artists/ArtistsSlice.ts';
import { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { createAlbum } from '../AlbumsThunk.ts';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import {selectCreateAlbumLoader} from "../AlbumsSlice.ts";
import {selectUser} from "../../Users/usersSlice.ts";

const initialState: IAlbumMutation = {
    artist: '',
    name: "",
    image: null,
    year: "",
}

const AlbumForm = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const [state, setState] = useState<IAlbumMutation>(initialState);
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateAlbumLoader);
    const user = useAppSelector(selectUser);

    if (!user) {
        navigate('/')
    }

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createAlbum(state));
            toast.success('Album was created Successfully!');
            navigate(`/albums?id_artist=${state.artist}`);
            setState(initialState);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => {
                return {
                    ...prevState,
                    [name]: files[0]
                };
            })
        }
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
                            value={state.artist}
                            onChange={inputChangeHandler}
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
                    <FileInput onChange={filesInputChangeHandler} name="image" label="Image" file={state.image}/>
                </Grid>

                <Grid>
                    <TextField
                        id="year"
                        label="Year"
                        value={state.year}
                        onChange={inputChangeHandler}
                        name="year"
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


