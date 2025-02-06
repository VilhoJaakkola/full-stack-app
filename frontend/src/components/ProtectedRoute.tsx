import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loggedIn } = useAuth();


    if (!loggedIn) {
        return <Navigate to="/" replace />;  // Ohjaa kirjautumissivulle, jos ei ole autentikoitunut
    }

    return <>{children}</>;
}

export default ProtectedRoute;
