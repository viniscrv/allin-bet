import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    authenticated: boolean;
    toggleAuthenticatedState: (value: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);

            navigate("/launcher/home");
        }

        setLoading(false);
    }, []);

    function toggleAuthenticatedState(value: boolean) {
        setAuthenticated(value);
    }

    if (loading) {
        return <h1>loading...</h1>;
    }

    return (
        <AuthContext.Provider
            value={{ authenticated, toggleAuthenticatedState }}
        >
            {children}
        </AuthContext.Provider>
    );
}
