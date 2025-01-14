import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;