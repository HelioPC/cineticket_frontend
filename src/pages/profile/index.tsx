import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Cinema from "./pages/Cinema";
import Movies from "./pages/Movies";

const Profile = () => {
    return (
        <div className='flex sm:flex-row flex-col w-full h-screen bg-white'>
            <Sidebar />
            
            <div className='p-7 flex-1 sm:h-screen h-[90vh] overflow-y-scroll'>
                <Routes>
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/cinema" element={<Cinema />} />
                </Routes>
            </div>
        </div>
    );
}

export default Profile;
