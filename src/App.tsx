// React imports
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Home from './pages/Home'
import Login from "./pages/Login";
import Page404 from "./pages/Page404";

const App = () => {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
        </BrowserRouter>
	)
}

export default App;
