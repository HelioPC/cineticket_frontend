import React from "react";
import { Outlet, Route, Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Sidebar from "../Sidebar";

const ProtectedRoute = () => {
    const { user } = useUser();

    return user.id ? (
        <div className='flex sm:flex-row flex-col w-full h-screen bg-white'>
            <Sidebar />
            
            <div className='p-7 flex-1 sm:h-screen h-[90vh] overflow-y-scroll text-black'>
                <Outlet />
            </div>
        </div>
    ) : <Navigate to="/login" />;
};

export default ProtectedRoute;
