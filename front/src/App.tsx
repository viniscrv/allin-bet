import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { ToastContextProvider } from "./contexts/ToastContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ToastContextProvider>
                    <UserProvider>
                        <Router />
                    </UserProvider>
                </ToastContextProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
