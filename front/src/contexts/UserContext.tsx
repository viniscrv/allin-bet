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
    loadingUserData: boolean;
    usernameCapitalized: string;
    refreshUserData: () => void;
}

interface userDataType {
    username: string;
    summary: string;
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

    const [updateUserData, setUpdateUserData] = useState(0);
    const [loadingUserData, setLoadingUserData] = useState(false);

    function refreshUserData() {
        setUpdateUserData(updateUserData + 1);
    }

    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
        if (authenticated) {
            setLoadingUserData(true);

            const fetchData = async () => {
                const response = await api.get("/me");
                setData(response.data.user);

                setLoadingUserData(false);
            };

            fetchData();
        }
    }, [authenticated, updateUserData]);

    function capitalizeUsername(username: string) {
        return username.charAt(0).toUpperCase() + username.slice(1);
    }

    const usernameCapitalized = capitalizeUsername(
        userData?.username ? userData?.username : "username"
    );

    return (
        <UserContext.Provider
            value={{ usernameCapitalized, userData, loadingUserData, refreshUserData }}
        >
            {children}
        </UserContext.Provider>
    );
}
