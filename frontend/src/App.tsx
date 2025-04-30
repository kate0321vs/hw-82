import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artists/Artists.tsx";
import Albums from "./features/Albums/Albums.tsx";
import Tracks from "./features/Tracks/Tracks.tsx";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";


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
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;