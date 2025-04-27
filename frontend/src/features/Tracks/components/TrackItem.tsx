import {ListItem, ListItemText, Typography} from '@mui/material';

interface Props {
    number: number,
    name: string,
    duration: string,
}

const TrackItem: React.FC<Props> = ({number, name, duration}) => {
    return (
        <>
            <ListItem divider>
                <Typography variant="body1" sx={{ width: '30px', fontWeight: 'bold' }}>
                    {number}.
                </Typography>
                <ListItemText
                    primary={name}
                    secondary={duration}
                    sx={{ marginLeft: 2 }}
                />
            </ListItem>
        </>

    );
};

export default TrackItem;