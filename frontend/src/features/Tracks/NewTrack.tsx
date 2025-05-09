import {Container, Typography} from "@mui/material";
import TrackForm from "./components/TrackForm.tsx";
import {useSelector} from "react-redux";
import {selectUser} from "../Users/usersSlice.ts";
import {useNavigate} from "react-router-dom";

const NewTrack = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
    }

    return (
        <Container maxWidth="sm">
            <Typography variant='h4' textAlign='center' mb={3}>Add Track</Typography>
            <TrackForm/>
        </Container>
    );
};

export default NewTrack;