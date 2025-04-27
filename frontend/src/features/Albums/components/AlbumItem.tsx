import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import imageNotAvailable from "../../../assets/images/imageNotAvailable.png";
import {baseURL} from "../../../globalConstants.ts";

interface Props {
    name: string;
    image: string;
    year: number;
    tracksAmount: number;
}

const AlbumItem: React.FC<Props> = ({image, name, year, tracksAmount}) => {
    let albumImage = imageNotAvailable;

    if (image) {
        albumImage = baseURL + '/' + image;
    }
    return (
        <Grid  style={{ width: '45%' }}>
            <Card sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'black', height: '150px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                        <Typography component="div" variant="h5" color="white">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                            {year}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                            <strong>Tracks:</strong> {tracksAmount}
                        </Typography>
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