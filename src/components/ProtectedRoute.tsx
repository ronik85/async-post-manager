// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactElement;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
