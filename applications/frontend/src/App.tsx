import './App.css';
import {Routes, Route} from 'react-router-dom';
import RepositoriesPage from "./pages/RepositoriesPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from "./components/PrivateRoute";

function App() {

    return (
        <>
            <Routes>
                <Route path="/repositories" element={
                    <PrivateRoute>
                        <RepositoriesPage/>
                    </PrivateRoute>
                }/>
                <Route path="/auth" element={<AuthenticationPage />}/>
                <Route path="*" element={
                    <PrivateRoute>
                        <NotFoundPage/>
                    </PrivateRoute>
                }/>
            </Routes>
        </>
    )
}

export default App
