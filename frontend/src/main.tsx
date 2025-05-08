import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persister, store} from "./app/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {addInterceptors} from "./axiosApi.ts";
import {ToastContainer} from "react-toastify";

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persister}>
            <ToastContainer autoClose={1000}/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
