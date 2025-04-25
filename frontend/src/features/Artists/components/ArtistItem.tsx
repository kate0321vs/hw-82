import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import imageNotAvailable from '../../../assets/images/imageNotAvailable.png'
import {baseURL} from "../../../globalConstants.ts";
import { Link } from "react-router-dom";

interface Props {
    name: string;
    image: string;
    id: string;
}

const ArtistItem: React.FC<Props> = ({image, name, id}) => {
   let artistImage = imageNotAvailable;

   if (image) {
       artistImage = baseURL + '/' + image;
   }

    return (
        <Grid >
            <Card  component={Link} to={'/albums/' + id}>
                <CardActionArea/>
                <CardMedia
                    sx={{height: 300, width: 400}}
                    image={artistImage}
                    />
                <CardContent
                style={{backgroundColor: 'black', borderRadius: '0 0 10px 10px'}}>
                    <Typography style={{color: "white"}}>{name}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ArtistItem;