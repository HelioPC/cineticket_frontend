// React imports
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./contexts/UserContext";
import About from "./pages/About";

// Pages
import Home from './pages/Home'
import Login from "./pages/Login";
import MakeReserva from "./pages/MakeReserva";
import Page404 from "./pages/Page404";
import Profile from "./pages/profile";
import Auditoria from "./pages/profile/pages/Auditoria";
import Cinemas from "./pages/profile/pages/Cinemas";
import Edit from "./pages/profile/pages/Edit";
import Movies from "./pages/profile/pages/Movies";
import Session from "./pages/profile/pages/Session";
import UsersPage from "./pages/profile/pages/UsersPage";
import Reservas from "./pages/Reservas";
import Sessions from "./pages/Sessions";

const App = () => {
    const { user } = useUser();
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="sessions" element={<Sessions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reserva/:id" element={<MakeReserva />} />
                
                <Route path="/profile/:id/" element={<ProtectedRoute />}>
                    <Route path="/profile/:id/" element={<Profile />} />
                    <Route path="/profile/:id/movies" element={<Movies />} />
                    {
                        user.nivel === 'admin' && (
                            <>
                                <Route path="/profile/:id/users" element={<UsersPage />} />
                                <Route path="/profile/:id/cinemas" element={<Cinemas />} />
                                <Route path="/profile/:id/auditoria" element={<Auditoria />} />
                            </>
                        )
                    }
                    <Route path='/profile/:id/reservations' element={<Reservas />} />
                    <Route path='/profile/:id/session' element={<Session />} />
                    <Route path="/profile/:id/me" element={<Edit />} />
                    <Route path=":id/*" element={<Page404 />} />
                </Route>

                <Route path='*' element={<Page404 />} />
            </Routes>
        </BrowserRouter>
	)
}

export default App;
