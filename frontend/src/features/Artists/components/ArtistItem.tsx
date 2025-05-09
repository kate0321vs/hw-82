import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, IconButton, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import imageNotAvailable from '../../../assets/images/imageNotAvailable.png'
import {baseURL} from "../../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../Users/usersSlice.ts";
import {deleteArtist, fetchArtists, makePublish} from "../ArtistsThunk.ts";
import {toast} from "react-toastify";
import {selectDeleteArtistLoading, selectPublishedLoading} from "../ArtistsSlice.ts";

interface Props {
    name: string;
    image: string;
    id: string;
    isPublished: boolean;
}

const ArtistItem: React.FC<Props> = ({image, name, id, isPublished}) => {
    let artistImage = imageNotAvailable;
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectDeleteArtistLoading);
    const publishLoading = useAppSelector(selectPublishedLoading)

    if (image) {
        artistImage = baseURL + '/' + image;
    }

    const onDelete = async () => {
        if  (window.confirm(`Delete artist "${name}"?`)) {
            await dispatch(deleteArtist(id));
            await dispatch(fetchArtists());
            toast.success('Artist was deleted Successfully!');
        }
    };

    const onPublished = async () => {
        if  (window.confirm(`Published artist ${name}?`)) {
            await dispatch(makePublish(id));
            await dispatch(fetchArtists());
            toast.success('Artist has been published successfully.');
        }
    }

    return (
        <Grid>
            <Card>
                <CardActionArea component={NavLink} to={`/albums?id_artist=${id}`}>
                    <CardMedia
                        sx={{height: 300, width: 400}}
                        image={artistImage}
                        title={name}
                    />
                </CardActionArea>
                    <CardContent
                        style={{
                            backgroundColor: 'black',
                            borderRadius: '0 0 10px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Typography style={{color: "white", fontSize: "22px", flexGrow: 1}}>{name}</Typography>
                        {user && user.role === 'admin' &&
                            <>{!isPublished && (
                                <>
                                    <Typography variant="body2" color="warning" pr={1}>Unpublished</Typography>
                                    <IconButton title='Public' onClick={onPublished}>
                                        {publishLoading === id ? <CircularProgress size={22}/> : <CheckCircleIcon color='warning'/> }
                                    </IconButton>
                                </>
                            )}
                                <IconButton onClick={onDelete}
                                    title="Delete">
                                    {deleteLoading === id ? <CircularProgress size={22}/> : <DeleteIcon color='error'/>  }
                                </IconButton>
                            </>
                        }
                    </CardContent>
            </Card>
        </Grid>
    );
};

export default ArtistItem;