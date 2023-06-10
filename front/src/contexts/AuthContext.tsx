import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    authenticated: boolean;
    loading: boolean;
    handleLogin: (username: string, password: string) => void;
    handleLogout: () => void;
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
        }

        setLoading(false);
    }, []);

    async function handleLogin(username: string, password: string) {
        console.log(username, password);

        try {
            const { data } = await api.post("/login", {
                username,
                password
            });

            localStorage.setItem("token", JSON.stringify(data.token));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            setAuthenticated(true);
            navigate("/launcher");

        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        }
    }

    function handleLogout() {

        setAuthenticated(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        navigate("/");
    }

    if (loading) {
        return <h1>loading...</h1>
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, loading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}
