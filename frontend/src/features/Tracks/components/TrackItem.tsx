import {Box, IconButton, ListItem, Typography} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Props {
    number: number,
    name: string,
    duration: string,
    addToTrackHistory: () => void,
}

const TrackItem: React.FC<Props> = ({number, name, duration, addToTrackHistory}) => {

    return (
        <>
            <ListItem divider>
                <Typography variant="body1" sx={{ width: '30px', fontWeight: 'bold' }}>
                    {number}.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <IconButton>
                        <PlayArrowIcon onClick={addToTrackHistory}/>
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">{name}</Typography>
                        <Typography variant="body2" color="text.secondary">{duration}</Typography>
                    </Box>
                </Box>
            </ListItem>
        </>

    );
};

export default TrackItem;