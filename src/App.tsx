// React imports
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Home from './pages/Home'
import Page404 from "./pages/Page404";

const App = () => {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
        </BrowserRouter>
	)
}

export default App;
