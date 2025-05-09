import {Box, CircularProgress, IconButton, ListItem, Typography} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../Users/usersSlice.ts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {selectDeleteTrackLoader, selectPublicTrackLoader} from "../TracksSlice.ts";
import {toast} from "react-toastify";
import {deleteTrack, fetchTracks, makePublicTrack} from "../TracksThunk.ts";

interface Props {
    number: number,
    name: string,
    duration: string,
    addToTrackHistory: () => void,
    isPublished: boolean,
    id: string;
    albumId: string | null;
}

const TrackItem: React.FC<Props> = ({number, name, duration, addToTrackHistory, isPublished, id, albumId}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const publicLoading = useAppSelector(selectPublicTrackLoader);
    const deleteLoading = useAppSelector(selectDeleteTrackLoader);

    const onDelete = async () => {
        if  (window.confirm(`Delete album "${name}"?`)) {
            await dispatch(deleteTrack(id));
            await dispatch(fetchTracks(albumId));
            toast.success('Album was deleted Successfully!');
        }
    };

    const onPublic = async () => {
        if  (window.confirm(`Published album ${name}?`)) {
            await dispatch(makePublicTrack(id));
            await dispatch(fetchTracks(albumId));
            toast.success('Album has been published successfully.');
        }
    };

    return (
        <>
            <ListItem divider>
                <Typography variant="body1" sx={{ width: '30px', fontWeight: 'bold' }}>
                    {number}.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    {user &&
                        <IconButton>
                            <PlayArrowIcon onClick={addToTrackHistory}/>
                        </IconButton>
                    }
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">{name}</Typography>
                        <Typography variant="body2" color="text.secondary">{duration}</Typography>
                    </Box>
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
                </Box>
            </ListItem>
        </>

    );
};

export default TrackItem;