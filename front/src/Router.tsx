import { Routes, Route } from "react-router-dom";
import { Presentation } from "./pages/Presentation";
import { Login } from "./pages/Login";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Profile } from "./pages/Launcher/Profile";
import { History } from "./pages/Launcher/History";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Presentation />} />
            <Route path="/login" element={<Login />} />

            {/* TODO: rotas protegidas */}
            <Route path="/launcher" element={<DefaultLayout />}>
                {/* rotas com layout */}
                <Route path="/launcher/profile" element={<Profile/>}/>
                <Route path="/launcher/history" element={<History/>}/>
            </Route>
        </Routes>
    );
}
