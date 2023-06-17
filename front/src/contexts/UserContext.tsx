import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import { api } from "../lib/axios";
import { AuthContext } from "./AuthContext";

interface UserContextType {
    userData?: userDataType;
    usernameCapitalized: string;
}

interface userDataType {
    username: string;
    email: string;
    created_at: Date;
    balance: number;
}

export const UserContext = createContext({} as UserContextType);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [userData, setData] = useState<userDataType>();

    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
        if (authenticated) {
            const fetchData = async () => {
                const response = await api.get("/me");
                setData(response.data.user);
            };

            fetchData();
        }
    }, []);

    function capitalizeUsername(username: string) {
        return username.charAt(0).toUpperCase() + username.slice(1);
    }

    const usernameCapitalized = capitalizeUsername(
        userData?.username ? userData?.username : "username"
    );

    return (
        <UserContext.Provider value={{ usernameCapitalized, userData }}>
            {children}
        </UserContext.Provider>
    );
}
