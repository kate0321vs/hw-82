import {Button, CircularProgress, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { IMutationArtist } from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import {createArtist} from "../ArtistsThunk.ts";
import { toast } from "react-toastify";
import {selectCreateLoading} from "../ArtistsSlice.ts";

const initialState: IMutationArtist = {
    name: '',
    information: '',
    image: null
}

const ArtistForm = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState<IMutationArtist>(initialState);
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateLoading);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createArtist(state));
            toast.success('Artist was created Successfully!');
            navigate('/')
            setState(initialState);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, files } = e.target;
        if (files) {
            setState(prevState => {
                return {...prevState,
                    [name]: files[0]};
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
                    <TextField
                        id="information"
                        label="Information"
                        value={state.information}
                        onChange={inputChangeHandler}
                        name="information"
                        fullWidth
                    />
                </Grid>

                <Grid>
                    <FileInput onChange={filesInputChangeHandler} name="image" label="Image" file={state.image}/>
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

export default ArtistForm;