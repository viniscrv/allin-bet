import { createContext, ReactNode, useState } from "react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    authenticated: boolean;
    handleLogin: (username: string, password: string) => void;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(username: string, password: string) {
        console.log(username, password);

        try {
            await api.post("/login", {
                username,
                password
            });

            setAuthenticated(true);
            navigate("/launcher");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}
