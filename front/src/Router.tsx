import { Routes, Route } from "react-router-dom";
import { Presentation } from "./pages/Presentation";
import { Login } from "./pages/Login";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Profile } from "./pages/Launcher/Profile";
import { History } from "./pages/Launcher/History";
import { Deposit } from "./pages/Launcher/Deposit";
import { EditProfile } from "./pages/Launcher/EditProfile";
import { Register } from "./pages/Register";
import { DoubleGain } from "./pages/Launcher/Games/DoubleGain";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Presentation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* TODO: rotas protegidas */}
            <Route path="/launcher" element={<DefaultLayout />}>
                {/* rotas com layout */}
                <Route path="/launcher/profile" element={<Profile/>}/>
                <Route path="/launcher/edit-profile" element={<EditProfile/>}/>
                <Route path="/launcher/history" element={<History/>}/>
                <Route path="/launcher/deposit" element={<Deposit/>}/>
                <Route path="/launcher/games/double-gain" element={<DoubleGain/>}/>
            </Route>
        </Routes>
    );
}
