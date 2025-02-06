import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
    loggedIn: boolean;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const token: string | null = localStorage.getItem("token");
        const userRole: string | null = localStorage.getItem("role");
        if (token && userRole) {
            setLoggedIn(true);
            setRole(userRole);
        }
    }, []);

    const login = (token: string, userRole: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setLoggedIn(true);
        setRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setLoggedIn(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
