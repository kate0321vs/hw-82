import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artists/Artists.tsx";
import Albums from "./features/Albums/Albums.tsx";
import Tracks from "./features/Tracks/Tracks.tsx";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";
import TrackHistory from "./features/TrackHistory/TrackHistory.tsx";
import NewArtist from "./features/Artists/NewArtist.tsx";
import NewAlbum from "./features/Albums/NewAlbum.tsx";
import NewTrack from "./features/Tracks/NewTrack.tsx";

const App = () => {

    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path='/' element={<Artists />}  />
                        <Route path='/artists' element={<Artists />}  />
                        <Route path='/albums' element={<Albums />}  />
                        <Route path='/tracks' element={<Tracks />}  />
                        <Route path="/artists/new" element={<NewArtist/>}/>
                        <Route path="/albums/new" element={<NewAlbum/>}/>
                        <Route path="/tracks/new" element={<NewTrack/>}/>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/track_history" element={<TrackHistory/>} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;