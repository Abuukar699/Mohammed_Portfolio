import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps admin-only routes.
 * If the user is not authenticated as admin → redirect to /admin/login.
 */
const ProtectedRoute = ({ children }) => {
    const { isAdmin } = useAuth();
    const location = useLocation();

    if (!isAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
