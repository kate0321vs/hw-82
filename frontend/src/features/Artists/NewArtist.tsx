import ArtistForm from "./components/ArtistForm.tsx";
import {Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../Users/usersSlice.ts";


const NewArtist = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
    }

    return (
        <Container maxWidth="sm">
            <Typography variant='h4' textAlign='center' mb={3}>Add Artist</Typography>
            <ArtistForm/>
        </Container>
    );
};

export default NewArtist;