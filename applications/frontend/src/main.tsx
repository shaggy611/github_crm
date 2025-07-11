import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {UserProvider} from "./store/UserContext";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#c44e06',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
    shape: {
        borderRadius: 10,
    },
});

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
                <App />
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>,
)
