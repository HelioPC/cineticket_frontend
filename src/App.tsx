// React imports
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";

// Pages
import Home from './pages/Home'
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Profile from "./pages/profile";
import Sessions from "./pages/Sessions";

const App = () => {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="sessions" element={<Sessions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
        </BrowserRouter>
	)
}

export default App;
