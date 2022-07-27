import React from "react";
import { Outlet, Route, Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const ProtectedRoute = () => {
    const { user } = useUser();

    return user.id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
