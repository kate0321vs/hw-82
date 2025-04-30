import {Box, Container, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchLoadingTrackHistory, selectTrackHistory} from "./TrackHistorySlice.ts";
import {trackHistoryFetch} from "./TrackHistoryThunk.ts";
import dayjs from "dayjs";
import {selectUser} from "../Users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectTrackHistory);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const loading = useAppSelector(fetchLoadingTrackHistory)

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return
        }
        dispatch(trackHistoryFetch());

    }, [dispatch, user]);

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Track History
                </Typography>
                {loading ?
                    <Spinner/> :
                    (history ?
                    <List>
                        {history.map((item) => (
                            <Box key={item._id}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${item.artist.name} — ${item.track.name}`}
                                        secondary={dayjs(item.datetime).format('DD.MM.YYYY HH:mm')}
                                    />
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                    </List> :
                <Typography>Тo tracks listened yet</Typography>)}

            </Container>
        </>
    );
};

export default TrackHistory;