import {Container, Typography} from "@mui/material";
import AlbumForm from "./components/AlbumForm.tsx";

const NewAlbum = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant='h4' textAlign='center'></Typography>
            <AlbumForm/>
        </Container>
    );
};

export default NewAlbum;