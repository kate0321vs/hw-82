import {Box, Card, CardContent, CardMedia, CircularProgress, IconButton, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import imageNotAvailable from "../../../assets/images/imageNotAvailable.png";
import {baseURL} from "../../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import { selectUser } from "../../Users/usersSlice.ts";
import {toast} from "react-toastify";
import {deleteAlbum, fetchAlbums, makePublicAlbum} from "../AlbumsThunk.ts";
import {selectDeleteAlbumLoader, selectPublicAlbumLoader} from "../AlbumsSlice.ts";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
    name: string;
    image: string;
    year: number;
    tracksAmount: number;
    id: string;
    isPublished: boolean;
    artistId: string | null;
}

const AlbumItem: React.FC<Props> = ({image, name, year, tracksAmount, id, isPublished, artistId}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectDeleteAlbumLoader);
    const publicLoading = useAppSelector(selectPublicAlbumLoader);

    let albumImage = imageNotAvailable;

    if (image) {
        albumImage = baseURL + '/' + image;
    }

    const onDelete = async () => {
        if  (window.confirm(`Delete album "${name}"?`)) {
            await dispatch(deleteAlbum(id));
            await dispatch(fetchAlbums(artistId));
            toast.success('Album was deleted Successfully!');
        }
    };

    const onPublic = async () => {
        if  (window.confirm(`Published album ${name}?`)) {
            await dispatch(makePublicAlbum(id));
            await dispatch(fetchAlbums(artistId));
            toast.success('Album has been published successfully.');
        }
    };

    return (
        <Grid  style={{ width: '45%' }}>
            <Card sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'black', height: '200px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center'}}>
                    <CardContent sx={{padding: '0 0 0 20px'}} >
                        <Typography component="div" variant="h5" color="white" mt={2}>
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                            {year}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ color: 'gray', mb:2 }}>
                            <strong>Tracks:</strong> {tracksAmount}
                        </Typography>
                        {user && user.role === 'admin' &&
                            <>{!isPublished && (
                                <>
                                    <Typography variant="body2" color="warning" pr={1}>Unpublished</Typography>
                                    <IconButton sx={{px:0, mr: 1}} title='Public' onClick={onPublic}>
                                        {publicLoading === id ? <CircularProgress size={22}/> : <CheckCircleIcon color='warning'/> }
                                    </IconButton>
                                </>
                            )}
                                <IconButton sx={{px:0}} onClick={onDelete}
                                            title="Delete">
                                    {deleteLoading === id ? <CircularProgress size={22}/> : <DeleteIcon color='error'/>  }
                                </IconButton>
                            </>
                        }
                            <IconButton sx={{ml: 'auto'}} component={NavLink} to={`/tracks?id_album=${id}`}>
                                <ArrowForwardIosIcon sx={{color: 'white'}}/>
                            </IconButton>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151, height: '100%', objectFit: 'cover' }}
                    image={albumImage}
                    alt={name}
                />
            </Card>
        </Grid>

    );
};

export default AlbumItem;